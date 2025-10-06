import {
  component$,
  useSignal,
  useComputed$,
  useOnDocument,
  useTask$,
  $,
  type QRL,
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
  getCourseTimeRange,
} from "~/utils/schedule";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface ScheduleCardProps {
  course: Course;
  detailed?: boolean;
  showDay?: boolean;
  isCompact?: boolean;
  isSelected?: boolean;
  onClick$?: QRL<() => void>;
}

export const ScheduleCard = component$<ScheduleCardProps>(
  ({
    course,
    detailed = false,
    showDay = false,
    isCompact = false,
    isSelected = false,
    onClick$,
  }) => {
    const timeFormat = useSignal<TimeFormat>("24");
    const isHovered = useSignal(false);
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
    const courseStatus = useComputed$(() => {
      const isActive = isCourseActive(course);
      const timeRemaining = isActive ? getTimeRemainingInCourse(course) : null;

      return {
        isActive,
        timeRemaining,
        formattedTimeRemaining: timeRemaining
          ? formatTimeRemaining(timeRemaining)
          : null,
      };
    });

    const courseDetails = useComputed$(() => {
      const { start_time, end_time } = getCourseTimeRange(course);
      const duration = calculateDuration(start_time, end_time);
      const cardColor = getCourseCardColor(course);
      const badgeColor = getCourseBadgeColor(course);

      return {
        start_time,
        end_time,
        duration,
        cardColor,
        badgeColor,
        formattedStartTime: formatTime(start_time, timeFormat.value),
        formattedEndTime: formatTime(end_time, timeFormat.value),
      };
    });

    const lecturerInitials = useComputed$(() => {
      return course.lecturer.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    });

    // Event handlers
    const handleCardClick = $(() => {
      if (onClick$) {
        onClick$();
      } else if (!detailed) {
        isExpanded.value = !isExpanded.value;
      }
    });

    const handleMouseEnter = $(() => {
      isHovered.value = true;
    });

    const handleMouseLeave = $(() => {
      isHovered.value = false;
    });

    // Compact view for mobile or condensed layouts
    if (isCompact) {
      return (
        <div
          class={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border flex-1 h-full ${
            isSelected ? "border-primary shadow-primary/20" : "border-base-300"
          } ${courseStatus.value.isActive ? "ring-2 ring-success ring-offset-1" : ""}`}
          onClick$={handleCardClick}
        >
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-sm truncate">{course.course_name}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-primary font-medium">
                    {courseDetails.value.formattedStartTime} -{" "}
                    {courseDetails.value.formattedEndTime}
                  </span>
                  {courseStatus.value.isActive && (
                    <div class="badge badge-success badge-xs gap-1 animate-pulse">
                      <div class="w-1 h-1 bg-current rounded-full"></div>
                      LIVE
                    </div>
                  )}
                </div>
              </div>

              <div class="flex flex-col items-end gap-1">
                <div class="badge badge-outline badge-xs">
                  {course.location.room}
                </div>
                <div class="badge badge-neutral badge-xs">
                  {course.credits} SKS
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        class={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex-1 h-full flex flex-col ${
          isSelected ? "ring-2 ring-primary ring-offset-1" : ""
        } ${
          courseStatus.value.isActive
            ? "ring-2 ring-success ring-offset-1 shadow-success/20"
            : ""
        }`}
        onClick$={handleCardClick}
        onMouseEnter$={handleMouseEnter}
        onMouseLeave$={handleMouseLeave}
      >
        {/* Enhanced Card Header with Gradient and Animations */}
        <div
          class={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br ${courseDetails.value.cardColor} p-4 text-white`}
        >
          {/* Active Status Indicator */}
          {courseStatus.value.isActive && (
            <div class="absolute top-4 right-4 z-20">
              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <div class="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
                <span class="text-sm font-bold">LIVE</span>
                {courseStatus.value.formattedTimeRemaining && (
                  <div class="text-xs bg-white/30 rounded-full px-2 py-0.5">
                    {courseStatus.value.formattedTimeRemaining} tersisa
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Day Badge (if shown) */}
          {showDay && (
            <div class="absolute top-4 left-4 z-20">
              <div class="badge badge-outline border-white/50 text-white backdrop-blur-sm">
                {course.day}
              </div>
            </div>
          )}

          <div class="relative z-10">
            <div class="mb-3">
              <h3 class="text-lg lg:text-xl font-bold leading-tight mb-1">
                {course.course_name}
              </h3>
              {course.original_name &&
                course.original_name !== course.course_name && (
                  <p class="text-white/80 text-sm italic">
                    {course.original_name}
                  </p>
                )}
            </div>

            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
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
                <span class="font-medium text-sm">
                  {courseDetails.value.formattedStartTime} -{" "}
                  {courseDetails.value.formattedEndTime}
                </span>
              </div>

              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span class="text-sm font-medium">
                  {courseDetails.value.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div class="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8 transform">
            <div class="w-full h-full rounded-full bg-white/10 animate-pulse"></div>
          </div>
          <div class="absolute bottom-0 left-0 w-24 h-24 translate-x-4 translate-y-4 transform">
            <div class="w-full h-full rounded-full bg-white/5"></div>
          </div>
          <div class="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 transform opacity-30">
            <div
              class="w-full h-full rounded-full bg-white/5 animate-spin"
              style="animation-duration: 20s;"
            ></div>
          </div>
        </div>

        {/* Enhanced Card Body */}
        <div class="card-body p-6 flex-1 flex flex-col">
          {/* Top Content - Course Badges */}
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <div
              class={`badge ${courseDetails.value.badgeColor} gap-2 shadow-md`}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {course.schedule_type}
            </div>

            <div class="badge badge-outline font-mono">
              {course.course_code}
            </div>

            <div class="badge badge-neutral font-bold">
              {course.credits} SKS
            </div>

            <div class="badge badge-ghost">Kelas {course.class}</div>
          </div>

          {/* Middle Content - Lecturer Info */}
          <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-base-200/50 to-base-300/50 rounded-lg mb-4">
            <div class="avatar">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md">
                {lecturerInitials.value}
              </div>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-base">{course.lecturer.name}</h4>
              <p class="text-base-content/70 text-sm">
                {course.lecturer.titles.join(", ")}
              </p>
            </div>

            {/* Lecturer Badge */}
            <div class="flex flex-col items-end gap-1">
              <span class="badge badge-primary badge-sm">Dosen</span>
            </div>
          </div>

          {/* Spacer to push location to bottom */}
          <div class="flex-1"></div>

          {/* Bottom Content - Location Info (Always at bottom) */}
          <div class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-3 border border-accent/20">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gradient-to-br from-accent to-accent-focus rounded-lg text-white shadow-md">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h5 class="font-bold text-base">
                  Ruang {course.location.room}
                </h5>
                <p class="text-base-content/70">{course.location.building}</p>
              </div>
            </div>
          </div>

          {/* Expandable Details Section */}
          {(detailed || isExpanded.value) && (
            <div class="space-y-4 animate-fade-in-up">
              <div class="divider">
                <span class="text-sm font-medium">Detail Tambahan</span>
              </div>

              {/* Enhanced Stats Grid */}
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="stat bg-base-200 rounded-lg p-3 place-items-center">
                  <div class="stat-title text-xs">Hari</div>
                  <div class="stat-value text-sm text-primary">
                    {course.day}
                  </div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3 place-items-center">
                  <div class="stat-title text-xs">Durasi</div>
                  <div class="stat-value text-sm text-secondary">
                    {courseDetails.value.duration}
                  </div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3 place-items-center">
                  <div class="stat-title text-xs">Kelas</div>
                  <div class="stat-value text-sm text-accent">
                    {course.class}
                  </div>
                </div>

                <div class="stat bg-base-200 rounded-lg p-3 place-items-center">
                  <div class="stat-title text-xs">Kode</div>
                  <div class="stat-value text-xs text-info font-mono">
                    {course.course_code}
                  </div>
                </div>
              </div>

              {/* Course Note */}
              {course.note && (
                <div class="alert alert-info shadow-lg">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold">Catatan</h3>
                    <div class="text-sm">{course.note}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced CSS Styles */}
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

            .hover-lift:hover {
              transform: translateY(-1px);
              transition: all 0.2s ease-out;
            }

            /* Custom focus styles for accessibility */
            .card:focus-visible {
              outline: 2px solid hsl(var(--p));
              outline-offset: 2px;
            }



            /* Smooth transitions */
            .card, .btn, .badge, .alert {
              transition: all 0.2s ease-out;
            }

            /* Custom scrollbar for mobile */
            @media (max-width: 768px) {
              .overflow-y-auto::-webkit-scrollbar {
                width: 4px;
              }

              .overflow-y-auto::-webkit-scrollbar-track {
                background: hsl(var(--b2));
              }

              .overflow-y-auto::-webkit-scrollbar-thumb {
                background: hsl(var(--bc) / 0.2);
                border-radius: 2px;
              }
            }
        `}</style>
      </div>
    );
  },
);
