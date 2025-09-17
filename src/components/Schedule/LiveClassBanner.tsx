import {
  component$,
  useSignal,
  useVisibleTask$,
  useOnWindow,
  $,
} from "@builder.io/qwik";
import type { Course, ScheduleData } from "~/types/schedule";
import {
  getActiveCourses,
  getCoursesStartingSoon,
  getTimeRemainingInCourse,
  getTimeUntilCourse,
  formatTimeRemaining,
  formatTime,
  getCourseTimeRange,
} from "~/utils/schedule";
import { getTimeFormat, type TimeFormat } from "~/utils/settings";

interface LiveClassBannerProps {
  scheduleData: ScheduleData;
}

export const LiveClassBanner = component$<LiveClassBannerProps>(
  ({ scheduleData }) => {
    const activeCourses = useSignal<Course[]>([]);
    const coursesStartingSoon = useSignal<Course[]>([]);
    const timeFormat = useSignal<TimeFormat>("24");
    const currentTime = useSignal<string>("");

    const updateLiveStatus = $(() => {
      activeCourses.value = getActiveCourses(scheduleData);
      coursesStartingSoon.value = getCoursesStartingSoon(scheduleData);

      // Update current time display
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      currentTime.value = formatTime(`${hours}:${minutes}`, timeFormat.value);
    });

    const handleTimeFormatChange = $((event: Event) => {
      const customEvent = event as CustomEvent<{ format: TimeFormat }>;
      timeFormat.value = customEvent.detail.format;
      updateLiveStatus();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      timeFormat.value = getTimeFormat();
      updateLiveStatus();

      // Update every 30 seconds
      const interval = setInterval(() => {
        updateLiveStatus();
      }, 30000);

      return () => clearInterval(interval);
    });

    // Listen for time format changes
    useOnWindow("timeFormatChanged", handleTimeFormatChange);

    // Don't render if no active or upcoming courses
    if (
      activeCourses.value.length === 0 &&
      coursesStartingSoon.value.length === 0
    ) {
      return null;
    }

    return (
      <div class="space-y-4">
        {/* Active Courses Banner */}
        {activeCourses.value.length > 0 && (
          <div class="alert alert-success shadow-lg">
            <div class="flex-shrink-0">
              <div class="relative">
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
                <div class="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-green-400"></div>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold">🔴 LIVE - Kelas Sedang Berlangsung</h3>
              <div class="text-sm opacity-90">
                {activeCourses.value.map((course, index) => {
                  const timeRemaining = getTimeRemainingInCourse(course);
                  return (
                    <div
                      key={`active-${course.course_code}-${index}`}
                      class="mt-2"
                    >
                      <div class="flex items-center justify-between">
                        <div>
                          <span class="font-semibold">
                            {course.course_name}
                          </span>
                          <span class="ml-2 opacity-70">
                            ({course.course_code} - Ruang {course.location.room}
                            )
                          </span>
                        </div>
                        <div class="flex items-center gap-2">
                          {timeRemaining && (
                            <div class="badge badge-success badge-sm">
                              {formatTimeRemaining(timeRemaining)} tersisa
                            </div>
                          )}
                          <div class="text-xs opacity-70">
                            {(() => {
                              const { start_time, end_time } =
                                getCourseTimeRange(course);
                              return `${formatTime(start_time, timeFormat.value)} - ${formatTime(end_time, timeFormat.value)}`;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Starting Soon Banner */}
        {coursesStartingSoon.value.length > 0 && (
          <div class="alert alert-warning shadow-lg">
            <div class="flex-shrink-0">
              <div class="relative">
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
                <div class="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-yellow-400"></div>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold">⏰ Kelas Akan Dimulai Segera</h3>
              <div class="text-sm opacity-90">
                {coursesStartingSoon.value.map((course, index) => {
                  const timeUntil = getTimeUntilCourse(course);
                  return (
                    <div
                      key={`soon-${course.course_code}-${index}`}
                      class="mt-2"
                    >
                      <div class="flex items-center justify-between">
                        <div>
                          <span class="font-semibold">
                            {course.course_name}
                          </span>
                          <span class="ml-2 opacity-70">
                            ({course.course_code} - Ruang {course.location.room}
                            )
                          </span>
                        </div>
                        <div class="flex items-center gap-2">
                          {timeUntil && (
                            <div class="badge badge-warning badge-sm">
                              {formatTimeRemaining(timeUntil)} lagi
                            </div>
                          )}
                          <div class="text-xs opacity-70">
                            Mulai{" "}
                            {(() => {
                              const { start_time } = getCourseTimeRange(course);
                              return formatTime(start_time, timeFormat.value);
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Current Time Display */}
        <div class="flex justify-center">
          <div class="badge badge-neutral gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Sekarang: {currentTime.value}
          </div>
        </div>
      </div>
    );
  },
);
