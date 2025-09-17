import {
  component$,
  useSignal,
  useVisibleTask$,
  useOnWindow,
  $,
} from "@builder.io/qwik";
import type { Course } from "~/types/schedule";
import {
  formatTime,
  calculateDuration,
  getCourseCardColor,
  getCourseBadgeColor,
  isCourseActive,
  getTimeRemainingInCourse,
  formatTimeRemaining,
} from "~/utils/schedule";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface ScheduleCardProps {
  course: Course;
  detailed?: boolean;
  showDay?: boolean;
}

export const ScheduleCard = component$<ScheduleCardProps>(
  ({ course, detailed = false, showDay = false }) => {
    const timeFormat = useSignal<TimeFormat>("24");
    const isActive = useSignal(false);
    const timeRemaining = useSignal<number | null>(null);

    const updateStatus = $(() => {
      isActive.value = isCourseActive(course);
      timeRemaining.value = getTimeRemainingInCourse(course);
    });

    const handleTimeFormatChange = $((event: Event) => {
      const customEvent = event as CustomEvent<{ format: TimeFormat }>;
      timeFormat.value = customEvent.detail.format;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      timeFormat.value = getTimeFormat();
      updateStatus();

      // Update status every minute
      const interval = setInterval(() => {
        updateStatus();
      }, 60000);

      return () => clearInterval(interval);
    });

    // Listen for time format changes
    useOnWindow("timeFormatChanged", handleTimeFormatChange);

    const duration = calculateDuration(course.start_time, course.end_time);
    const cardColor = getCourseCardColor(course);
    const badgeColor = getCourseBadgeColor(course);

    return (
      <div
        class={`card bg-base-100 hover-lift hover-glow shadow-xl transition-all duration-300 ${isActive.value ? "ring-2 ring-primary ring-offset-2" : ""}`}
      >
        {/* Card Header with Gradient */}
        <div
          class={`relative overflow-hidden rounded-t-2xl bg-gradient-to-r ${cardColor} p-6 text-white`}
        >
          {/* Active indicator */}
          {isActive.value && (
            <div class="absolute top-4 right-4">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                <span class="text-sm font-medium">Sedang Berlangsung</span>
                {timeRemaining.value && timeRemaining.value > 0 && (
                  <div class="ml-2 rounded-full bg-white/20 px-2 py-1 text-xs">
                    {formatTimeRemaining(timeRemaining.value)} tersisa
                  </div>
                )}
              </div>
            </div>
          )}

          <div class="relative z-10">
            <div class="mb-4 flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold leading-tight">
                  {course.course_name}
                </h3>
                {course.original_name &&
                  course.original_name !== course.course_name && (
                    <p class="text-white/80 text-sm mt-1">
                      {course.original_name}
                    </p>
                  )}
              </div>
              {showDay && (
                <div class="badge badge-outline border-white/30 text-white">
                  {course.day}
                </div>
              )}
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <svg
                  class="h-5 w-5"
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
                <span class="font-medium">
                  {formatTime(course.start_time, timeFormat.value)} -{" "}
                  {formatTime(course.end_time, timeFormat.value)}
                </span>
              </div>
              <div class="text-white/80 text-sm">{duration}</div>
            </div>
          </div>

          {/* Background decoration */}
          <div class="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 transform rounded-full bg-white/10"></div>
          <div class="absolute bottom-0 left-0 h-24 w-24 translate-x-4 translate-y-4 transform rounded-full bg-white/5"></div>
        </div>

        {/* Card Body */}
        <div class="card-body">
          <div class="space-y-4">
            {/* Course Info */}
            <div class="flex flex-wrap items-center gap-3">
              <div class={`badge ${badgeColor} badge-lg gap-2`}>
                <svg
                  class="h-4 w-4"
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
                {course.schedule_type}
              </div>

              <div class="badge badge-outline badge-lg">
                {course.course_code}
              </div>

              <div class="badge badge-neutral badge-lg">
                {course.credits} SKS
              </div>

              <div class="badge badge-outline">Kelas {course.class}</div>
            </div>

            {/* Lecturer Info */}
            <div class="flex items-start gap-3">
              <div class="from-primary to-secondary avatar placeholder">
                <div class="bg-gradient-to-r w-10 rounded-full text-white">
                  <span class="text-sm font-bold">
                    {course.lecturer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold">{course.lecturer.name}</h4>
                <p class="text-base-content/70 text-sm">
                  {course.lecturer.titles.join(", ")}
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div class="from-base-200 to-base-300 rounded-xl bg-gradient-to-r p-4">
              <div class="flex items-center gap-3">
                <div class="from-accent to-accent-focus bg-gradient-to-r p-2 rounded-lg text-white">
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h5 class="font-semibold">Ruang {course.location.room}</h5>
                  <p class="text-base-content/70 text-sm">
                    {course.location.building}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details (for detailed view) */}
            {detailed && (
              <div class="space-y-3">
                <div class="divider">Detail Tambahan</div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-base-content/70">Hari:</span>
                    <p class="font-medium">{course.day}</p>
                  </div>
                  <div>
                    <span class="text-base-content/70">Durasi:</span>
                    <p class="font-medium">{duration}</p>
                  </div>
                </div>

                {course.note && (
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{course.note}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
