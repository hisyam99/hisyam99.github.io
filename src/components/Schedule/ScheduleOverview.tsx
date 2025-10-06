import {
  component$,
  useSignal,
  useComputed$,
  useOnDocument,
  useTask$,
  $,
} from "@builder.io/qwik";
import type { ScheduleData, DayOfWeek } from "~/types/schedule";
import {
  getActiveDays,
  getCoursesForDay,
  getNextCourse,
  sortCoursesByTime,
  isCourseActive,
  formatTime,
  getCourseTimeRange,
} from "~/utils/schedule";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface ScheduleOverviewProps {
  scheduleData: ScheduleData;
  currentDay: DayOfWeek;
}

interface OverviewStats {
  totalCourses: number;
  totalCredits: number;
  uniqueLecturers: number;
  coursesByType: Record<string, number>;
  activeDaysCount: number;
  weeklyLoadHours: number;
}

export const ScheduleOverview = component$<ScheduleOverviewProps>(
  ({ scheduleData, currentDay }) => {
    const timeFormat = useSignal<TimeFormat>("24");
    const isStatsExpanded = useSignal(false);
    const selectedStatCard = useSignal<string | null>(null);

    // Initialize time format
    useTask$(() => {
      timeFormat.value = getTimeFormat();
    });

    // Listen for time format changes with proper cleanup
    useOnDocument(
      "timeFormatChanged",
      $((event: Event) => {
        const customEvent = event as CustomEvent<{ format: TimeFormat }>;
        timeFormat.value = customEvent.detail.format;
      }),
    );

    // Computed values for better performance
    const overviewStats = useComputed$<OverviewStats>(() => {
      const allCourses = Object.values(scheduleData.schedule).flat();

      const coursesByType = allCourses.reduce(
        (acc, course) => {
          acc[course.schedule_type] = (acc[course.schedule_type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Calculate weekly load in hours (assuming each credit = 50 minutes class time)
      const weeklyLoadHours = allCourses.reduce((total, course) => {
        return total + course.credits * 0.83; // 50 minutes = 0.83 hours
      }, 0);

      return {
        totalCourses: allCourses.length,
        totalCredits: allCourses.reduce(
          (sum, course) => sum + course.credits,
          0,
        ),
        uniqueLecturers: new Set(
          allCourses.map((course) => course.lecturer.name),
        ).size,
        coursesByType,
        activeDaysCount: getActiveDays(scheduleData).length,
        weeklyLoadHours: Math.round(weeklyLoadHours * 100) / 100,
      };
    });

    const todayData = useComputed$(() => {
      const todayCourses = getCoursesForDay(scheduleData, currentDay);
      const sortedTodayCourses = sortCoursesByTime(todayCourses);
      const nextCourse = getNextCourse(sortedTodayCourses);
      const activeCourse = sortedTodayCourses.find((course) =>
        isCourseActive(course),
      );

      return {
        courses: todayCourses,
        sortedCourses: sortedTodayCourses,
        nextCourse,
        activeCourse,
        todayCredits: todayCourses.reduce(
          (sum, course) => sum + course.credits,
          0,
        ),
      };
    });

    const weeklyScheduleData = useComputed$(() => {
      const activeDays = getActiveDays(scheduleData);
      return activeDays.map((day) => {
        const courses = getCoursesForDay(scheduleData, day);
        return {
          day,
          courseCount: courses.length,
          credits: courses.reduce((sum, course) => sum + course.credits, 0),
          isToday: day === currentDay,
        };
      });
    });

    // Event handlers
    const handleStatCardClick = $((statType: string) => {
      selectedStatCard.value =
        selectedStatCard.value === statType ? null : statType;
    });

    const handleStatsToggle = $(() => {
      isStatsExpanded.value = !isStatsExpanded.value;
    });

    return (
      <div class="space-y-8">
        {/* Enhanced Overall Statistics */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Courses Card */}
          <div
            class={`card cursor-pointer transition-all duration-200 ${
              selectedStatCard.value === "courses"
                ? "bg-gradient-to-br from-primary to-primary-focus shadow-lg ring-2 ring-primary/20"
                : "bg-gradient-to-br from-primary/90 to-primary-focus shadow-md hover:shadow-lg"
            }`}
            onClick$={() => handleStatCardClick("courses")}
          >
            <div class="card-body items-center text-center text-primary-content p-4">
              <div class="relative">
                <svg
                  class="w-8 h-8 mb-2"
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
                {selectedStatCard.value === "courses" && (
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-primary-content rounded-full animate-ping"></div>
                )}
              </div>
              <div class="stat-value text-2xl font-bold">
                {overviewStats.value.totalCourses}
              </div>
              <div class="stat-title text-primary-content/90 font-medium">
                Total Mata Kuliah
              </div>
              <div class="stat-desc text-primary-content/70 text-xs mt-1">
                {overviewStats.value.activeDaysCount} hari aktif
              </div>
            </div>
          </div>

          {/* Total Credits Card */}
          <div
            class={`card cursor-pointer transition-all duration-200 ${
              selectedStatCard.value === "credits"
                ? "bg-gradient-to-br from-secondary to-secondary-focus shadow-lg ring-2 ring-secondary/20"
                : "bg-gradient-to-br from-secondary/90 to-secondary-focus shadow-md hover:shadow-lg"
            }`}
            onClick$={() => handleStatCardClick("credits")}
          >
            <div class="card-body items-center text-center text-secondary-content p-4">
              <div class="relative">
                <svg
                  class="w-8 h-8 mb-2"
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
                {selectedStatCard.value === "credits" && (
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-secondary-content rounded-full animate-ping"></div>
                )}
              </div>
              <div class="stat-value text-2xl font-bold">
                {overviewStats.value.totalCredits}
              </div>
              <div class="stat-title text-secondary-content/90 font-medium">
                Total SKS
              </div>
              <div class="stat-desc text-secondary-content/70 text-xs mt-1">
                ~{overviewStats.value.weeklyLoadHours}h per minggu
              </div>
            </div>
          </div>

          {/* Active Days Card */}
          <div
            class={`card cursor-pointer transition-all duration-200 ${
              selectedStatCard.value === "days"
                ? "bg-gradient-to-br from-accent to-accent-focus shadow-lg ring-2 ring-accent/20"
                : "bg-gradient-to-br from-accent/90 to-accent-focus shadow-md hover:shadow-lg"
            }`}
            onClick$={() => handleStatCardClick("days")}
          >
            <div class="card-body items-center text-center text-accent-content p-4">
              <div class="relative">
                <svg
                  class="w-8 h-8 mb-2"
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
                {selectedStatCard.value === "days" && (
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-accent-content rounded-full animate-ping"></div>
                )}
              </div>
              <div class="stat-value text-2xl font-bold">
                {overviewStats.value.activeDaysCount}
              </div>
              <div class="stat-title text-accent-content/90 font-medium">
                Hari Aktif
              </div>
              <div class="stat-desc text-accent-content/70 text-xs mt-1">
                dari 7 hari
              </div>
            </div>
          </div>

          {/* Lecturers Card */}
          <div
            class={`card cursor-pointer transition-all duration-200 ${
              selectedStatCard.value === "lecturers"
                ? "bg-gradient-to-br from-info to-info-focus shadow-lg ring-2 ring-info/20"
                : "bg-gradient-to-br from-info/90 to-info-focus shadow-md hover:shadow-lg"
            }`}
            onClick$={() => handleStatCardClick("lecturers")}
          >
            <div class="card-body items-center text-center text-info-content p-4">
              <div class="relative">
                <svg
                  class="w-8 h-8 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {selectedStatCard.value === "lecturers" && (
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-info-content rounded-full animate-ping"></div>
                )}
              </div>
              <div class="stat-value text-2xl font-bold">
                {overviewStats.value.uniqueLecturers}
              </div>
              <div class="stat-title text-info-content/90 font-medium">
                Dosen
              </div>
              <div class="stat-desc text-info-content/70 text-xs mt-1">
                pengajar
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Statistics Detail */}
        {selectedStatCard.value && (
          <div class="card bg-base-100 shadow-lg border border-base-300 animate-fade-in-up">
            <div class="card-body p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="card-title text-xl">
                  Detail{" "}
                  {selectedStatCard.value === "courses"
                    ? "Mata Kuliah"
                    : selectedStatCard.value === "credits"
                      ? "SKS"
                      : selectedStatCard.value === "days"
                        ? "Hari Aktif"
                        : "Dosen"}
                </h3>
                <button
                  class="btn btn-ghost btn-sm"
                  onClick$={() => handleStatCardClick("")}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {selectedStatCard.value === "courses" && (
                <div class="space-y-4">
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(overviewStats.value.coursesByType).map(
                      ([type, count]) => (
                        <div key={type} class="stat bg-base-200 rounded-lg p-4">
                          <div class="stat-title text-xs">{type}</div>
                          <div class="stat-value text-2xl text-primary">
                            {count}
                          </div>
                          <div class="stat-desc">mata kuliah</div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {selectedStatCard.value === "days" && (
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {weeklyScheduleData.value.map(
                    ({ day, courseCount, credits, isToday }) => (
                      <div
                        key={day}
                        class={`card p-4 text-center ${
                          isToday
                            ? "bg-primary text-primary-content shadow-lg"
                            : courseCount > 0
                              ? "bg-base-200 hover:bg-base-300"
                              : "bg-base-200/50"
                        }`}
                      >
                        <div class="text-sm font-medium">{day}</div>
                        <div class="text-lg font-bold">{courseCount}</div>
                        <div class="text-xs opacity-70">{credits} SKS</div>
                        {isToday && (
                          <div class="w-2 h-2 bg-primary-content rounded-full mx-auto mt-1 animate-pulse"></div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Today's Schedule Section */}
        <div class="grid gap-6 lg:grid-cols-2">
          {/* Today's Schedule Card */}
          <div class="card bg-gradient-to-br from-base-100 to-base-200/50 shadow-lg border border-base-300/50 min-h-[500px]">
            <div class="card-body p-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="card-title text-xl flex items-center gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg">
                    <svg
                      class="w-5 h-5 text-primary"
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
                  <div>
                    <span>Hari Ini</span>
                    <div class="text-lg font-normal text-primary">
                      ({currentDay})
                    </div>
                  </div>
                </h3>

                {todayData.value.courses.length > 0 && (
                  <div class="badge badge-primary gap-2">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {todayData.value.courses.length} mata kuliah
                  </div>
                )}
              </div>

              {todayData.value.courses.length > 0 ? (
                <div class="space-y-6">
                  {/* Today's Quick Stats */}
                  <div class="stats stats-vertical sm:stats-horizontal shadow-lg bg-base-100/50">
                    <div class="stat">
                      <div class="stat-figure text-primary">
                        <svg
                          class="w-8 h-8"
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
                      </div>
                      <div class="stat-title text-xs">Mata Kuliah</div>
                      <div class="stat-value text-primary text-2xl">
                        {todayData.value.courses.length}
                      </div>
                    </div>

                    <div class="stat">
                      <div class="stat-figure text-secondary">
                        <svg
                          class="w-8 h-8"
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
                      <div class="stat-title text-xs">Total SKS</div>
                      <div class="stat-value text-secondary text-2xl">
                        {todayData.value.todayCredits}
                      </div>
                    </div>
                  </div>

                  {/* Live/Next Course Alert */}
                  {todayData.value.activeCourse && (
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
                        <h4 class="font-bold">🔴 Sedang Berlangsung</h4>
                        <p class="text-sm">
                          {todayData.value.activeCourse.course_name}
                        </p>
                        <p class="text-xs opacity-80">
                          Ruang {todayData.value.activeCourse.location.room} •
                          {todayData.value.activeCourse.lecturer.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {todayData.value.nextCourse &&
                    !todayData.value.activeCourse && (
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
                          <p class="text-sm">
                            {todayData.value.nextCourse.course_name}
                          </p>
                          <p class="text-xs opacity-80">
                            {(() => {
                              const { start_time, end_time } =
                                getCourseTimeRange(todayData.value.nextCourse);
                              return `${formatTime(start_time, timeFormat.value)} - ${formatTime(end_time, timeFormat.value)}`;
                            })()}{" "}
                            • Ruang {todayData.value.nextCourse.location.room}
                          </p>
                        </div>
                      </div>
                    )}

                  {/* Today's Schedule Timeline */}
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <h4 class="font-bold text-lg">Jadwal Hari Ini</h4>
                      <button
                        class="btn btn-ghost btn-xs"
                        onClick$={handleStatsToggle}
                      >
                        {isStatsExpanded.value ? "Sembunyikan" : "Lihat Detail"}
                      </button>
                    </div>

                    <div class="space-y-2.5 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-300">
                      {todayData.value.sortedCourses.map((course, index) => {
                        const isActive = isCourseActive(course);
                        const { start_time, end_time } =
                          getCourseTimeRange(course);

                        return (
                          <div
                            key={`today-${course.course_code}-${index}`}
                            class={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 min-h-[65px] ${
                              isActive
                                ? "bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary shadow-lg"
                                : "bg-base-200/70 hover:bg-base-300/70 border border-base-300"
                            }`}
                          >
                            <div class="relative flex-shrink-0">
                              <div
                                class={`w-4 h-4 rounded-full ${
                                  isActive
                                    ? "bg-primary shadow-lg shadow-primary/50 animate-pulse"
                                    : "bg-base-content/30"
                                }`}
                              ></div>
                              {isActive && (
                                <div class="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                              )}
                            </div>

                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2 mb-0.5">
                                <p class="font-semibold truncate text-sm leading-tight">
                                  {course.course_name}
                                </p>
                                {isActive && (
                                  <div class="badge badge-primary badge-xs gap-1">
                                    <div class="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                                    LIVE
                                  </div>
                                )}
                              </div>

                              <div class="flex flex-wrap gap-2 text-xs opacity-80">
                                <span class="flex items-center gap-1">
                                  <svg
                                    class="w-2.5 h-2.5"
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
                                  {formatTime(start_time, timeFormat.value)} -{" "}
                                  {formatTime(end_time, timeFormat.value)}
                                </span>

                                <span class="flex items-center gap-1">
                                  <svg
                                    class="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  {course.location.room}
                                </span>

                                {isStatsExpanded.value && (
                                  <>
                                    <span class="flex items-center gap-1">
                                      <svg
                                        class="w-2.5 h-2.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                      {course.lecturer.name}
                                    </span>
                                    <span class="badge badge-outline badge-xs">
                                      {course.credits} SKS
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                // No classes today
                <div class="text-center py-8">
                  <div class="relative inline-block mb-6">
                    <svg
                      class="w-24 h-24 text-base-content/20 mx-auto"
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
                    <div class="absolute -top-2 -right-2 text-3xl animate-bounce">
                      🎉
                    </div>
                  </div>
                  <h4 class="text-lg font-bold mb-2">
                    Tidak Ada Jadwal Hari Ini!
                  </h4>
                  <p class="text-base-content/70 mb-3">
                    Nikmati waktu luang Anda dan manfaatkan untuk istirahat atau
                    kegiatan produktif lainnya.
                  </p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <div class="badge badge-success gap-1">
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
                      Waktu Bebas
                    </div>
                    <div class="badge badge-info gap-1">
                      <svg
                        class="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Self Study
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Semester Summary & Progress */}
          <div class="card bg-gradient-to-br from-base-100 to-base-200/50 shadow-lg border border-base-300/50 min-h-[500px]">
            <div class="card-body p-5">
              <h3 class="card-title text-xl mb-4 flex items-center gap-3">
                <div class="p-2 bg-secondary/10 rounded-lg">
                  <svg
                    class="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                Ringkasan Semester
              </h3>

              <div class="space-y-6">
                {/* Schedule Types Breakdown */}
                <div>
                  <h4 class="font-semibold mb-4 text-lg">Jenis Jadwal</h4>
                  <div class="grid gap-3">
                    {Object.entries(overviewStats.value.coursesByType).map(
                      ([type, count]) => {
                        const percentage =
                          (count / overviewStats.value.totalCourses) * 100;

                        return (
                          <div key={type} class="space-y-2">
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                <div
                                  class={`badge ${
                                    type === "Reguler"
                                      ? "badge-primary"
                                      : "badge-secondary"
                                  } gap-1`}
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
                                  {type}
                                </div>
                                <span class="text-sm text-base-content/70">
                                  {count} mata kuliah
                                </span>
                              </div>
                              <span class="font-semibold text-sm">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div class="w-full bg-base-300 rounded-full h-2">
                              <div
                                class={`h-2 rounded-full transition-all duration-1000 ${
                                  type === "Reguler"
                                    ? "bg-primary"
                                    : "bg-secondary"
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* Weekly Schedule Overview */}
                <div>
                  <h4 class="font-semibold mb-4 text-lg flex items-center gap-2">
                    Distribusi Mingguan
                    <div class="badge badge-sm badge-outline">
                      {overviewStats.value.activeDaysCount}/7 hari
                    </div>
                  </h4>

                  <div class="grid grid-cols-7 gap-1 mb-4">
                    {weeklyScheduleData.value.map(
                      ({ day, courseCount, isToday }) => (
                        <div
                          key={day}
                          class={`text-center p-2 rounded-lg text-xs transition-all ${
                            isToday
                              ? "bg-primary text-primary-content shadow-lg"
                              : courseCount > 0
                                ? "bg-base-200 hover:bg-base-300"
                                : "bg-base-200/50 opacity-50"
                          }`}
                        >
                          <div class="font-medium">{day.slice(0, 3)}</div>
                          <div class="text-lg font-bold">{courseCount}</div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Semester Progress */}
                <div>
                  <h4 class="font-semibold mb-4 text-lg">Progress Semester</h4>
                  <div class="space-y-4">
                    <div class="flex justify-between text-sm">
                      <span class="flex items-center gap-2">
                        <svg
                          class="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        SKS Terdaftar
                      </span>
                      <span class="font-bold">
                        {overviewStats.value.totalCredits} / 24 SKS
                      </span>
                    </div>

                    <div class="relative">
                      <progress
                        class="progress progress-primary w-full h-4"
                        value={overviewStats.value.totalCredits}
                        max="24"
                      ></progress>
                      <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {Math.round(
                          (overviewStats.value.totalCredits / 24) * 100,
                        )}
                        %
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-xs">
                      <div class="flex items-center gap-2 text-success">
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
                        <span>
                          Beban: {overviewStats.value.weeklyLoadHours}h/minggu
                        </span>
                      </div>
                      <div class="flex items-center gap-2 text-info">
                        <svg
                          class="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>
                          Sisa: {24 - overviewStats.value.totalCredits} SKS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS for animations */}
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

            .card:hover {
              transform: translateY(-2px);
              transition: all 0.2s ease-out;
            }

            .progress {
              appearance: none;
              border-radius: 0.5rem;
              overflow: hidden;
            }

            .progress::-webkit-progress-bar {
              background-color: hsl(var(--bc) / 0.2);
              border-radius: 0.5rem;
            }

            .progress::-webkit-progress-value {
              background: linear-gradient(90deg, hsl(var(--p)), hsl(var(--s)));
              border-radius: 0.5rem;
              transition: width 1s ease-in-out;
            }

            .progress::-moz-progress-bar {
              background: linear-gradient(90deg, hsl(var(--p)), hsl(var(--s)));
              border-radius: 0.5rem;
            }

            /* Custom scrollbar styles */
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }

            .scrollbar-thin::-webkit-scrollbar-track {
              background: hsl(var(--b2));
              border-radius: 3px;
            }

            .scrollbar-thumb-base-300::-webkit-scrollbar-thumb {
              background: hsl(var(--b3));
              border-radius: 3px;
            }

            .scrollbar-thumb-base-300::-webkit-scrollbar-thumb:hover {
              background: hsl(var(--bc) / 0.3);
            }

            /* Better spacing for course cards */
            .min-h-[500px] {
              min-height: 500px;
            }

            .min-h-[320px] {
              max-height: 320px;
            }

            .min-h-[65px] {
              min-height: 65px;
            }
        `}</style>
      </div>
    );
  },
);
