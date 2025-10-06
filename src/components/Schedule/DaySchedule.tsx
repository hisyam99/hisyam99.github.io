import {
  component$,
  useSignal,
  useComputed$,
  useOnDocument,
  useTask$,
  $,
} from "@builder.io/qwik";
import type { Course, DayOfWeek } from "~/types/schedule";
import { ScheduleCard } from "./ScheduleCard";
import {
  sortCoursesByTime,
  getNextCourse,
  formatTime,
  getCourseTimeRange,
  isCourseActive,
} from "~/utils/schedule";
import { useStaggerAnimation } from "~/hooks/useScrollAnimation";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface DayScheduleProps {
  day: DayOfWeek;
  courses: Course[];
  isToday?: boolean;
  detailed?: boolean;
}

interface DayStats {
  totalCredits: number;
  courseTypes: Record<string, number>;
  timeRange: { start: string; end: string } | null;
  totalDuration: number;
  averageCredits: number;
}

export const DaySchedule = component$<DayScheduleProps>(
  ({ day, courses, isToday = false, detailed = false }) => {
    const staggerRef = useStaggerAnimation(150);
    const timeFormat = useSignal<TimeFormat>("24");
    const viewMode = useSignal<"grid" | "timeline" | "compact">(
      detailed ? "timeline" : "grid",
    );
    const showAdvancedStats = useSignal(false);
    const selectedCourse = useSignal<string | null>(null);
    const isExpanded = useSignal(detailed);

    // Initialize time format
    useTask$(() => {
      timeFormat.value = getTimeFormat();
    });

    // Listen for time format changes
    useOnDocument(
      "timeFormatChanged",
      $((event: Event) => {
        const customEvent = event as CustomEvent<{ format: TimeFormat }>;
        timeFormat.value = customEvent.detail.format;
      }),
    );

    // Computed values for better performance
    const sortedCourses = useComputed$(() => sortCoursesByTime(courses));

    const nextCourse = useComputed$(() =>
      isToday ? getNextCourse(sortedCourses.value) : null,
    );

    const activeCourse = useComputed$(() =>
      isToday
        ? sortedCourses.value.find((course) => isCourseActive(course))
        : null,
    );

    const dayStats = useComputed$<DayStats>(() => {
      if (courses.length === 0) {
        return {
          totalCredits: 0,
          courseTypes: {},
          timeRange: null,
          totalDuration: 0,
          averageCredits: 0,
        };
      }

      const sorted = sortedCourses.value;
      const totalCredits = courses.reduce(
        (sum, course) => sum + course.credits,
        0,
      );

      const courseTypes = courses.reduce(
        (acc, course) => {
          acc[course.schedule_type] = (acc[course.schedule_type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      let timeRange = null;
      let totalDuration = 0;

      if (sorted.length > 0) {
        const firstCourse = sorted[0];
        const lastCourse = sorted[sorted.length - 1];

        const { start_time: firstStart } = getCourseTimeRange(firstCourse);
        const { end_time: lastEnd } = getCourseTimeRange(lastCourse);

        timeRange = {
          start: formatTime(firstStart, timeFormat.value),
          end: formatTime(lastEnd, timeFormat.value),
        };

        // Calculate total duration in hours
        sorted.forEach((course) => {
          const { start_time, end_time } = getCourseTimeRange(course);
          // Parse time strings to get hours and minutes
          const [startHours, startMinutes] = start_time.split(":").map(Number);
          const [endHours, endMinutes] = end_time.split(":").map(Number);
          const duration =
            endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
          totalDuration += duration;
        });
        totalDuration = totalDuration / 60; // Convert to hours
      }

      return {
        totalCredits,
        courseTypes,
        timeRange,
        totalDuration: Math.round(totalDuration * 10) / 10,
        averageCredits: Math.round((totalCredits / courses.length) * 10) / 10,
      };
    });

    const timelineData = useComputed$(() => {
      if (!detailed) return [];

      const timeline: Array<{
        time: string;
        courses: Course[];
        isBreak?: boolean;
      }> = [];
      const sorted = sortedCourses.value;

      for (let i = 0; i < sorted.length; i++) {
        const course = sorted[i];
        const { start_time, end_time } = getCourseTimeRange(course);
        const timeSlot = `${formatTime(start_time, timeFormat.value)} - ${formatTime(end_time, timeFormat.value)}`;

        // Check if there are concurrent courses
        const concurrentCourses = sorted.filter((c) => {
          const { start_time: cStart } = getCourseTimeRange(c);
          return cStart === start_time;
        });

        const existingSlot = timeline.find((slot) => slot.time === timeSlot);
        if (existingSlot) {
          existingSlot.courses.push(course);
        } else {
          timeline.push({ time: timeSlot, courses: concurrentCourses });
        }

        // Add break if there's a gap
        if (i < sorted.length - 1) {
          const nextCourse = sorted[i + 1];
          const { start_time: nextStart } = getCourseTimeRange(nextCourse);
          // Parse time strings to get minutes
          const [endHours, endMinutes] = end_time.split(":").map(Number);
          const [nextHours, nextMinutes] = nextStart.split(":").map(Number);
          const currentEndMinutes = endHours * 60 + endMinutes;
          const nextStartMinutes = nextHours * 60 + nextMinutes;

          if (nextStartMinutes - currentEndMinutes > 15) {
            // 15+ minute gap
            timeline.push({
              time: `${formatTime(end_time, timeFormat.value)} - ${formatTime(nextStart, timeFormat.value)}`,
              courses: [],
              isBreak: true,
            });
          }
        }
      }

      return timeline.filter(
        (slot, index, arr) =>
          arr.findIndex((s) => s.time === slot.time) === index,
      );
    });

    // Event handlers
    const handleViewModeChange = $((mode: "grid" | "timeline" | "compact") => {
      viewMode.value = mode;
    });

    const handleCourseSelect = $((courseCode: string) => {
      selectedCourse.value =
        selectedCourse.value === courseCode ? null : courseCode;
    });

    const handleStatsToggle = $(() => {
      showAdvancedStats.value = !showAdvancedStats.value;
    });

    const handleExpandToggle = $(() => {
      isExpanded.value = !isExpanded.value;
    });

    // Empty state
    if (courses.length === 0) {
      return (
        <div class="card bg-gradient-to-br from-base-100 to-base-200/50 shadow-xl border border-base-300/50">
          <div class="card-body text-center py-16">
            <div class="relative inline-block mb-8">
              <svg
                class="w-32 h-32 text-base-content/20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {isToday && (
                <div class="absolute -top-2 -right-2">
                  <div class="badge badge-primary gap-2 animate-pulse">
                    <div class="w-2 h-2 bg-current rounded-full"></div>
                    Hari Ini
                  </div>
                </div>
              )}
            </div>

            <h3 class="text-3xl font-bold mb-4">Tidak Ada Jadwal - {day}</h3>

            <p class="text-base-content/70 mb-6 max-w-md mx-auto">
              Tidak ada mata kuliah terjadwal pada hari {day}.
              {isToday
                ? "Nikmati waktu luang Anda!"
                : "Hari yang bebas untuk kegiatan lain."}
            </p>

            <div class="flex flex-wrap justify-center gap-3">
              <div class="badge badge-success badge-lg gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Hari Libur
              </div>

              {isToday && (
                <div class="badge badge-info badge-lg gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Waktu Produktif
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class="space-y-4">
        {/* Enhanced Day Header */}
        <div class="card bg-gradient-to-br from-base-100 to-base-200/30 shadow-lg border border-base-300/50">
          <div class="card-body p-4">
            {/* Header Section */}
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <h2 class="text-2xl lg:text-3xl font-bold flex items-center gap-3">
                    <div
                      class={`p-2 rounded-lg ${isToday ? "bg-primary text-primary-content animate-pulse" : "bg-base-300"}`}
                    >
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {day}
                      </span>
                      {isToday && (
                        <div class="badge badge-primary ml-2 gap-2 animate-pulse">
                          <div class="w-2 h-2 bg-current rounded-full"></div>
                          Hari Ini
                        </div>
                      )}
                    </div>
                  </h2>
                </div>

                <div class="flex flex-wrap items-center gap-4 text-base-content/70">
                  <span class="flex items-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {courses.length} mata kuliah
                  </span>

                  <span class="flex items-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {dayStats.value.totalCredits} SKS
                  </span>

                  {dayStats.value.timeRange && (
                    <span class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {dayStats.value.timeRange.start} -{" "}
                      {dayStats.value.timeRange.end}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div class="stats stats-vertical lg:stats-horizontal shadow-md bg-base-100/80">
                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Mata Kuliah</div>
                  <div class="stat-value text-lg text-primary">
                    {courses.length}
                  </div>
                </div>
                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Total SKS</div>
                  <div class="stat-value text-lg text-secondary">
                    {dayStats.value.totalCredits}
                  </div>
                </div>
                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Durasi</div>
                  <div class="stat-value text-base text-accent">
                    {dayStats.value.totalDuration}h
                  </div>
                </div>
              </div>
            </div>

            {/* Live/Next Course Alerts */}
            {isToday && (
              <div class="space-y-3">
                {activeCourse.value && (
                  <div class="alert alert-success shadow-md animate-pulse">
                    <div class="flex-shrink-0">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold flex items-center gap-2">
                        🔴 Sedang Berlangsung
                        <div class="badge badge-sm badge-outline">LIVE</div>
                      </h4>
                      <p class="text-sm font-medium">
                        {activeCourse.value.course_name}
                      </p>
                      <p class="text-xs opacity-90">
                        Ruang {activeCourse.value.location.room} •{" "}
                        {activeCourse.value.lecturer.name}
                      </p>
                    </div>
                  </div>
                )}

                {nextCourse.value && !activeCourse.value && (
                  <div class="alert alert-info shadow-md">
                    <div class="flex-shrink-0">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold">⏰ Mata Kuliah Selanjutnya</h4>
                      <p class="text-sm font-medium">
                        {nextCourse.value.course_name}
                      </p>
                      <p class="text-xs opacity-90">
                        {(() => {
                          const { start_time, end_time } = getCourseTimeRange(
                            nextCourse.value,
                          );
                          return `${formatTime(start_time, timeFormat.value)} - ${formatTime(end_time, timeFormat.value)}`;
                        })()}{" "}
                        • Ruang {nextCourse.value.location.room}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View Mode Controls */}
            {detailed && (
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-base-300">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium">Mode Tampilan:</span>
                  <div class="join">
                    <input
                      class="join-item btn btn-sm"
                      type="radio"
                      name={`view-${day}`}
                      aria-label="Timeline"
                      checked={viewMode.value === "timeline"}
                      onChange$={() => handleViewModeChange("timeline")}
                    />
                    <input
                      class="join-item btn btn-sm"
                      type="radio"
                      name={`view-${day}`}
                      aria-label="Grid"
                      checked={viewMode.value === "grid"}
                      onChange$={() => handleViewModeChange("grid")}
                    />
                    <input
                      class="join-item btn btn-sm"
                      type="radio"
                      name={`view-${day}`}
                      aria-label="Compact"
                      checked={viewMode.value === "compact"}
                      onChange$={() => handleViewModeChange("compact")}
                    />
                  </div>
                </div>

                <button
                  class="btn btn-ghost btn-sm gap-2"
                  onClick$={handleStatsToggle}
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {showAdvancedStats.value ? "Sembunyikan" : "Statistik"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Statistics */}
        {showAdvancedStats.value && detailed && (
          <div class="card bg-base-100 shadow-lg border border-base-300 animate-fade-in-up">
            <div class="card-body p-4">
              <h3 class="card-title mb-4">Statistik Detail - {day}</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="stat bg-base-200 rounded-lg p-3">
                  <div class="stat-title text-xs">Rata-rata SKS</div>
                  <div class="stat-value text-lg text-primary">
                    {dayStats.value.averageCredits}
                  </div>
                  <div class="stat-desc">per mata kuliah</div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3">
                  <div class="stat-title text-xs">Total Durasi</div>
                  <div class="stat-value text-lg text-secondary">
                    {dayStats.value.totalDuration}h
                  </div>
                  <div class="stat-desc">waktu kuliah</div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3">
                  <div class="stat-title text-xs">Jenis Terbanyak</div>
                  <div class="stat-value text-base text-accent">
                    {Object.entries(dayStats.value.courseTypes).sort(
                      (a, b) => b[1] - a[1],
                    )[0]?.[0] || "N/A"}
                  </div>
                  <div class="stat-desc">
                    {Object.entries(dayStats.value.courseTypes).sort(
                      (a, b) => b[1] - a[1],
                    )[0]?.[1] || 0}{" "}
                    mata kuliah
                  </div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3">
                  <div class="stat-title text-xs">Beban Hari</div>
                  <div class="stat-value text-base text-info">
                    {dayStats.value.totalCredits > 6
                      ? "Tinggi"
                      : dayStats.value.totalCredits > 3
                        ? "Sedang"
                        : "Ringan"}
                  </div>
                  <div class="stat-desc">kategori beban</div>
                </div>
              </div>

              {/* Course Types Breakdown */}
              <div class="mt-6">
                <h4 class="font-semibold mb-3">Distribusi Jenis Mata Kuliah</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(dayStats.value.courseTypes).map(
                    ([type, count]) => (
                      <div
                        key={type}
                        class="flex items-center justify-between p-3 bg-base-200 rounded-lg"
                      >
                        <div
                          class={`badge ${type === "Reguler" ? "badge-primary" : "badge-secondary"}`}
                        >
                          {type}
                        </div>
                        <span class="font-bold">{count}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Content */}
        {detailed && viewMode.value === "timeline" ? (
          // Timeline View
          <div class="space-y-4">
            <h3 class="text-xl font-bold flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Timeline Harian
            </h3>

            <div class="space-y-4">
              {timelineData.value.map((slot, index) => (
                <div key={index} class="relative">
                  <div class="flex items-start gap-4">
                    {/* Time Indicator */}
                    <div class="flex flex-col items-center flex-shrink-0">
                      <div
                        class={`w-4 h-4 rounded-full ${slot.isBreak ? "bg-base-content/30" : "bg-primary"}`}
                      ></div>
                      {index < timelineData.value.length - 1 && (
                        <div
                          class={`w-0.5 h-16 mt-2 ${slot.isBreak ? "bg-base-content/20" : "bg-primary/30"}`}
                        ></div>
                      )}
                    </div>

                    {/* Content */}
                    <div class="flex-1 pb-8">
                      <div class="text-sm font-medium text-primary mb-2">
                        {slot.time}
                      </div>

                      {slot.isBreak ? (
                        <div class="p-4 bg-base-200 rounded-lg border-2 border-dashed border-base-300">
                          <div class="flex items-center gap-2 text-base-content/60">
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span class="text-sm">Jeda Istirahat</span>
                          </div>
                        </div>
                      ) : (
                        <div
                          class={`grid gap-4 ${slot.courses.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
                        >
                          {slot.courses.map((course, courseIndex) => (
                            <div
                              key={`wrapper-${course.course_code}-${courseIndex}`}
                              class="h-full flex"
                            >
                              <ScheduleCard
                                key={`${course.course_code}-${courseIndex}`}
                                course={course}
                                detailed={true}
                                showDay={false}
                                isSelected={
                                  selectedCourse.value === course.course_code
                                }
                                onClick$={() =>
                                  handleCourseSelect(course.course_code)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Grid/Compact View
          <div
            ref={staggerRef}
            class={`stagger-container grid gap-6 ${
              detailed
                ? viewMode.value === "compact"
                  ? "grid-cols-1 md:grid-cols-2 auto-rows-fr"
                  : "grid-cols-1"
                : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr"
            }`}
          >
            {sortedCourses.value.map((course, index) => (
              <div
                key={`${course.course_code}-${index}`}
                class="stagger-item h-full flex"
              >
                <ScheduleCard
                  course={course}
                  detailed={detailed}
                  showDay={false}
                  isCompact={viewMode.value === "compact"}
                  isSelected={selectedCourse.value === course.course_code}
                  onClick$={() => handleCourseSelect(course.course_code)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Day Summary (for detailed view) */}
        {detailed && (
          <div class="card bg-gradient-to-br from-base-200/50 to-base-300/30 shadow-lg border border-base-300">
            <div class="card-body p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="card-title text-xl flex items-center gap-2">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Ringkasan {day}
                </h3>

                <button
                  class="btn btn-ghost btn-sm"
                  onClick$={handleExpandToggle}
                >
                  {isExpanded.value ? "Ciutkan" : "Perluas"}
                </button>
              </div>

              <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Mata Kuliah</div>
                  <div class="stat-value text-2xl text-primary">
                    {courses.length}
                  </div>
                </div>

                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Total SKS</div>
                  <div class="stat-value text-2xl text-secondary">
                    {dayStats.value.totalCredits}
                  </div>
                </div>

                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Jam Mulai</div>
                  <div class="stat-value text-lg text-accent">
                    {dayStats.value.timeRange?.start || "-"}
                  </div>
                </div>

                <div class="stat place-items-center">
                  <div class="stat-title text-xs">Jam Selesai</div>
                  <div class="stat-value text-lg text-info">
                    {dayStats.value.timeRange?.end || "-"}
                  </div>
                </div>
              </div>

              {isExpanded.value && (
                <div class="mt-6 space-y-4 animate-fade-in-up">
                  {/* Schedule Types Breakdown */}
                  <div>
                    <h4 class="text-lg font-semibold mb-3">
                      Distribusi Jenis Jadwal
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      {Object.entries(dayStats.value.courseTypes).map(
                        ([type, count]) => (
                          <div
                            key={type}
                            class={`badge badge-lg gap-2 ${type === "Reguler" ? "badge-primary" : "badge-secondary"}`}
                          >
                            <svg
                              class="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {type}: {count}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div class="bg-base-100 rounded-lg p-4">
                    <h4 class="font-semibold mb-2 flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-info"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Tips Hari Ini
                    </h4>
                    <div class="text-sm text-base-content/80">
                      {dayStats.value.totalCredits > 6 ? (
                        <p>
                          ⚡ Hari yang padat! Pastikan persiapan materi dan
                          istirahat cukup.
                        </p>
                      ) : dayStats.value.totalCredits > 3 ? (
                        <p>
                          📚 Hari yang seimbang. Gunakan waktu luang untuk
                          review materi.
                        </p>
                      ) : (
                        <p>
                          🌟 Hari yang santai. Waktu yang baik untuk self-study
                          atau refreshing.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced CSS */}
        <style>{`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(1rem);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fade-in-up 0.5s ease-out;
            }

            .stagger-container .stagger-item {
              opacity: 0;
              transform: translateY(1rem);
              animation: fade-in-up 0.6s ease-out forwards;
            }

            .stagger-container .stagger-item:nth-child(1) { animation-delay: 0.1s; }
            .stagger-container .stagger-item:nth-child(2) { animation-delay: 0.2s; }
            .stagger-container .stagger-item:nth-child(3) { animation-delay: 0.3s; }
            .stagger-container .stagger-item:nth-child(4) { animation-delay: 0.4s; }
            .stagger-container .stagger-item:nth-child(5) { animation-delay: 0.5s; }
            .stagger-container .stagger-item:nth-child(n+6) { animation-delay: 0.6s; }

            .card:hover {
              transform: translateY(-1px);
              transition: all 0.2s ease-out;
            }

            /* Timeline specific styles */
            .timeline-connector {
              background: linear-gradient(180deg, hsl(var(--p)) 0%, hsl(var(--s)) 100%);
            }

            /* Custom focus styles for accessibility */
            .btn:focus-visible,
            .card:focus-visible {
              outline: 2px solid hsl(var(--p));
              outline-offset: 2px;
            }

            /* Enhanced hover effects */
            .stat:hover {
              transform: scale(1.01);
              transition: transform 0.2s ease-out;
            }
        `}</style>
      </div>
    );
  },
);
