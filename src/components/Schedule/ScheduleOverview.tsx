import {
  component$,
  useSignal,
  useVisibleTask$,
  useOnWindow,
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
} from "~/utils/schedule";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface ScheduleOverviewProps {
  scheduleData: ScheduleData;
  currentDay: DayOfWeek;
}

export const ScheduleOverview = component$<ScheduleOverviewProps>(
  ({ scheduleData, currentDay }) => {
    const timeFormat = useSignal<TimeFormat>("24");

    const handleTimeFormatChange = $((event: Event) => {
      const customEvent = event as CustomEvent<{ format: TimeFormat }>;
      timeFormat.value = customEvent.detail.format;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      timeFormat.value = getTimeFormat();
    });

    // Listen for time format changes
    useOnWindow("timeFormatChanged", handleTimeFormatChange);

    const activeDays = getActiveDays(scheduleData);
    const todayCourses = getCoursesForDay(scheduleData, currentDay);
    const sortedTodayCourses = sortCoursesByTime(todayCourses);
    const nextCourse = getNextCourse(sortedTodayCourses);
    const activeCourse = sortedTodayCourses.find((course) =>
      isCourseActive(course),
    );

    // Calculate total statistics
    const totalCourses = Object.values(scheduleData.schedule).flat().length;
    const totalCredits = Object.values(scheduleData.schedule)
      .flat()
      .reduce((sum, course) => sum + course.credits, 0);

    const coursesByType = Object.values(scheduleData.schedule)
      .flat()
      .reduce(
        (acc, course) => {
          acc[course.schedule_type] = (acc[course.schedule_type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    // Get unique lecturers
    const uniqueLecturers = new Set(
      Object.values(scheduleData.schedule)
        .flat()
        .map((course) => course.lecturer.name),
    ).size;

    return (
      <div class="space-y-8">
        {/* Overall Statistics */}
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div class="card from-primary to-primary-focus bg-gradient-to-r text-primary-content shadow-xl">
            <div class="card-body items-center text-center">
              <svg
                class="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              <div class="stat-value text-3xl">{totalCourses}</div>
              <div class="stat-title text-primary-content/80">
                Total Mata Kuliah
              </div>
            </div>
          </div>

          <div class="card from-secondary to-secondary-focus bg-gradient-to-r text-secondary-content shadow-xl">
            <div class="card-body items-center text-center">
              <svg
                class="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div class="stat-value text-3xl">{totalCredits}</div>
              <div class="stat-title text-secondary-content/80">Total SKS</div>
            </div>
          </div>

          <div class="card from-accent to-accent-focus bg-gradient-to-r text-accent-content shadow-xl">
            <div class="card-body items-center text-center">
              <svg
                class="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <div class="stat-value text-3xl">{activeDays.length}</div>
              <div class="stat-title text-accent-content/80">Hari Aktif</div>
            </div>
          </div>

          <div class="card from-info to-info-focus bg-gradient-to-r text-info-content shadow-xl">
            <div class="card-body items-center text-center">
              <svg
                class="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <div class="stat-value text-3xl">{uniqueLecturers}</div>
              <div class="stat-title text-info-content/80">Dosen</div>
            </div>
          </div>
        </div>

        {/* Current Day Status */}
        <div class="grid gap-6 lg:grid-cols-2">
          {/* Today's Schedule */}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl">
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Hari Ini ({currentDay})
              </h3>

              {todayCourses.length > 0 ? (
                <div class="space-y-4">
                  <div class="stats shadow">
                    <div class="stat">
                      <div class="stat-title">Mata Kuliah Hari Ini</div>
                      <div class="stat-value text-primary">
                        {todayCourses.length}
                      </div>
                    </div>
                    <div class="stat">
                      <div class="stat-title">SKS Hari Ini</div>
                      <div class="stat-value text-secondary">
                        {todayCourses.reduce(
                          (sum, course) => sum + course.credits,
                          0,
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Course Alert */}
                  {activeCourse && (
                    <div class="alert alert-success">
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold">Sedang Berlangsung</h4>
                        <p class="text-sm">{activeCourse.course_name}</p>
                      </div>
                    </div>
                  )}

                  {/* Next Course Alert */}
                  {nextCourse && !activeCourse && (
                    <div class="alert alert-info">
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold">Mata Kuliah Selanjutnya</h4>
                        <p class="text-sm">
                          {nextCourse.course_name} pada{" "}
                          {formatTime(nextCourse.start_time, timeFormat.value)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Today's Schedule Timeline */}
                  <div class="space-y-2">
                    <h4 class="font-semibold">Jadwal Hari Ini:</h4>
                    {sortedTodayCourses.map((course, index) => {
                      const isActive = isCourseActive(course);
                      return (
                        <div
                          key={`today-${course.course_code}-${index}`}
                          class={`flex items-center gap-3 rounded-lg p-3 ${
                            isActive
                              ? "bg-primary/10 border border-primary"
                              : "bg-base-200"
                          }`}
                        >
                          <div
                            class={`h-3 w-3 rounded-full ${
                              isActive
                                ? "bg-primary animate-pulse"
                                : "bg-base-content/30"
                            }`}
                          ></div>
                          <div class="flex-1">
                            <p class="font-medium">{course.course_name}</p>
                            <p class="text-sm opacity-70">
                              {formatTime(course.start_time, timeFormat.value)}{" "}
                              - {formatTime(course.end_time, timeFormat.value)}{" "}
                              | Ruang {course.location.room}
                            </p>
                          </div>
                          {isActive && (
                            <div class="badge badge-primary badge-sm">Live</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div class="text-center py-8">
                  <svg
                    class="mx-auto h-16 w-16 text-base-content/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p class="text-base-content/70 mt-4">
                    Tidak ada jadwal kuliah hari ini. Enjoy your free time! 🎉
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Statistics & Schedule Types */}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-2xl">
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                Ringkasan Semester
              </h3>

              <div class="space-y-6">
                {/* Schedule Types */}
                <div>
                  <h4 class="font-semibold mb-3">Jenis Jadwal</h4>
                  <div class="space-y-2">
                    {Object.entries(coursesByType).map(([type, count]) => (
                      <div key={type} class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <div
                            class={`badge ${type === "Reguler" ? "badge-primary" : "badge-secondary"}`}
                          >
                            {type}
                          </div>
                        </div>
                        <span class="font-semibold">{count} mata kuliah</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Days List */}
                <div>
                  <h4 class="font-semibold mb-3">Hari Kuliah</h4>
                  <div class="flex flex-wrap gap-2">
                    {activeDays.map((day) => {
                      const dayCount = getCoursesForDay(
                        scheduleData,
                        day,
                      ).length;
                      return (
                        <div
                          key={day}
                          class={`badge badge-lg gap-2 ${
                            day === currentDay
                              ? "badge-primary"
                              : "badge-outline"
                          }`}
                        >
                          {day === currentDay && (
                            <div class="h-2 w-2 animate-pulse rounded-full bg-current"></div>
                          )}
                          {day} ({dayCount})
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Semester Progress */}
                <div>
                  <h4 class="font-semibold mb-3">Progress Semester</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm">
                      <span>SKS Progress</span>
                      <span>{totalCredits} / 24 SKS</span>
                    </div>
                    <progress
                      class="progress progress-primary w-full"
                      value={totalCredits}
                      max="24"
                    ></progress>
                    <p class="text-xs opacity-70">
                      Target semester: 24 SKS (asumsi beban normal)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
