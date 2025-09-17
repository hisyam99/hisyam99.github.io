import {
  component$,
  useSignal,
  useVisibleTask$,
  useOnWindow,
  $,
} from "@builder.io/qwik";
import type { Course, DayOfWeek } from "~/types/schedule";
import { ScheduleCard } from "./ScheduleCard";
import { sortCoursesByTime, getNextCourse, formatTime } from "~/utils/schedule";
import { useStaggerAnimation } from "~/hooks/useScrollAnimation";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface DayScheduleProps {
  day: DayOfWeek;
  courses: Course[];
  isToday?: boolean;
  detailed?: boolean;
}

export const DaySchedule = component$<DayScheduleProps>(
  ({ day, courses, isToday = false, detailed = false }) => {
    const staggerRef = useStaggerAnimation(150);
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

    const sortedCourses = sortCoursesByTime(courses);
    const nextCourse = isToday ? getNextCourse(sortedCourses) : null;

    if (courses.length === 0) {
      return (
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body text-center">
            <h3 class="card-title justify-center text-2xl">
              {day}
              {isToday && <div class="badge badge-primary ml-2">Hari Ini</div>}
            </h3>
            <div class="py-8">
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
                Tidak ada jadwal kuliah pada hari {day}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class="space-y-6">
        {/* Day Header */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h2 class="card-title text-3xl">
                  {day}
                  {isToday && (
                    <div class="badge badge-primary ml-2 gap-2">
                      <div class="h-2 w-2 animate-pulse rounded-full bg-current"></div>
                      Hari Ini
                    </div>
                  )}
                </h2>
                <p class="text-base-content/70 mt-1">
                  {courses.length} mata kuliah terjadwal
                </p>
              </div>

              {/* Quick Stats */}
              <div class="stats stats-horizontal shadow">
                <div class="stat">
                  <div class="stat-title text-xs">Total Mata Kuliah</div>
                  <div class="stat-value text-primary text-2xl">
                    {courses.length}
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-title text-xs">Total SKS</div>
                  <div class="stat-value text-secondary text-2xl">
                    {courses.reduce(
                      (total, course) => total + course.credits,
                      0,
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Course Alert (only for today) */}
            {isToday && nextCourse && (
              <div class="alert alert-info mt-4">
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
                    {formatTime(nextCourse.start_time, timeFormat.value)} -{" "}
                    {formatTime(nextCourse.end_time, timeFormat.value)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Cards */}
        <div
          ref={staggerRef}
          class={`stagger-container grid gap-6 ${
            detailed
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {sortedCourses.map((course, index) => (
            <div key={`${course.course_code}-${index}`} class="stagger-item">
              <ScheduleCard
                course={course}
                detailed={detailed}
                showDay={false}
              />
            </div>
          ))}
        </div>

        {/* Day Summary (for detailed view) */}
        {detailed && (
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2zm-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                Ringkasan Hari {day}
              </h3>

              <div class="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                <div class="stat">
                  <div class="stat-title">Mata Kuliah</div>
                  <div class="stat-value text-primary">{courses.length}</div>
                </div>

                <div class="stat">
                  <div class="stat-title">Total SKS</div>
                  <div class="stat-value text-secondary">
                    {courses.reduce(
                      (total, course) => total + course.credits,
                      0,
                    )}
                  </div>
                </div>

                <div class="stat">
                  <div class="stat-title">Jam Mulai</div>
                  <div class="stat-value text-accent text-lg">
                    {sortedCourses[0]
                      ? formatTime(
                          sortedCourses[0].start_time,
                          timeFormat.value,
                        )
                      : "-"}
                  </div>
                </div>

                <div class="stat">
                  <div class="stat-title">Jam Selesai</div>
                  <div class="stat-value text-info text-lg">
                    {sortedCourses[sortedCourses.length - 1]
                      ? formatTime(
                          sortedCourses[sortedCourses.length - 1].end_time,
                          timeFormat.value,
                        )
                      : "-"}
                  </div>
                </div>
              </div>

              {/* Schedule Types Breakdown */}
              <div class="mt-6">
                <h4 class="text-lg font-semibold mb-3">Jenis Jadwal</h4>
                <div class="flex flex-wrap gap-2">
                  {Array.from(new Set(courses.map((c) => c.schedule_type))).map(
                    (type) => {
                      const count = courses.filter(
                        (c) => c.schedule_type === type,
                      ).length;
                      return (
                        <div
                          key={type}
                          class={`badge gap-2 ${type === "Reguler" ? "badge-primary" : "badge-secondary"}`}
                        >
                          {type}: {count}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
