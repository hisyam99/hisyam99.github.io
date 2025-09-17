import {
  component$,
  useSignal,
  useVisibleTask$,
  useOnWindow,
  $,
} from "@builder.io/qwik";
import { TimeFormatToggle } from "~/components/TimeFormatToggle/TimeFormatToggle";
import type {
  DayOfWeek,
  ScheduleFilterOptions,
  ScheduleSource,
} from "~/types/schedule";
import { getCurrentDay, getAvailableScheduleSources } from "~/utils/schedule";

interface ScheduleToolbarProps {
  activeDays?: DayOfWeek[];
  currentFilters?: ScheduleFilterOptions;
}

export const ScheduleToolbar = component$<ScheduleToolbarProps>(
  ({
    activeDays = [],
    currentFilters = { selectedDay: "All", scheduleType: "All" },
  }) => {
    const isVisible = useSignal(false);
    const isExpanded = useSignal(true); // Toolbar show/hide state
    const currentDay = getCurrentDay();

    // Load saved state from localStorage
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      // Load expanded state
      const savedExpanded = localStorage.getItem("schedule-toolbar-expanded");
      if (savedExpanded !== null) {
        isExpanded.value = JSON.parse(savedExpanded);
      }

      // Delay to ensure smooth animation
      setTimeout(() => {
        isVisible.value = true;
      }, 100);
    });

    // Save state when changed
    const toggleExpanded = $(() => {
      isExpanded.value = !isExpanded.value;
      localStorage.setItem(
        "schedule-toolbar-expanded",
        JSON.stringify(isExpanded.value),
      );
    });

    // Keyboard shortcut (Ctrl/Cmd + H)
    useOnWindow(
      "keydown",
      $((event: Event) => {
        const e = event as KeyboardEvent;
        if ((e.ctrlKey || e.metaKey) && e.key === "h") {
          e.preventDefault();
          toggleExpanded();
        }
      }),
    );

    const handleQuickJump = $((day: DayOfWeek) => {
      const newFilters: ScheduleFilterOptions = {
        ...currentFilters,
        selectedDay: day,
      };

      // Dispatch custom events for parent component
      window.dispatchEvent(
        new CustomEvent("scheduleFilterChange", {
          detail: newFilters,
        }),
      );

      // Always switch to daily mode when selecting specific day
      window.dispatchEvent(
        new CustomEvent("scheduleViewModeChange", {
          detail: "daily",
        }),
      );

      // Smooth scroll to schedule content
      setTimeout(() => {
        const element = document.getElementById("schedule-content");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    });

    const handleAllFilter = $(() => {
      const newFilters: ScheduleFilterOptions = {
        ...currentFilters,
        selectedDay: "All" as const,
      };

      window.dispatchEvent(
        new CustomEvent("scheduleFilterChange", {
          detail: newFilters,
        }),
      );
    });

    const handleScheduleSourceChange = $((source: ScheduleSource) => {
      const newFilters: ScheduleFilterOptions = {
        ...currentFilters,
        scheduleSource: source,
      };

      window.dispatchEvent(
        new CustomEvent("scheduleFilterChange", {
          detail: newFilters,
        }),
      );
    });

    return (
      <>
        {/* Main Toolbar Container */}
        <div
          class={`
        fixed top-0 right-0 left-0 z-40 
        transition-all duration-700 ease-out
        ${
          isVisible.value
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
      `}
        >
          {/* Top Spacer */}
          <div class="h-24"></div>

          {/* Glassmorphism Container */}
          <div
            class={`
          container mx-auto px-6 py-4
          transition-all duration-500 ease-out
          ${
            isExpanded.value
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0 pointer-events-none"
          }
        `}
          >
            <div class="fluent-glass-card-center">
              <div class="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                {/* Left Section - Quick Actions */}
                <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                  <span class="text-sm font-medium opacity-70">
                    Quick Actions
                  </span>
                  <div class="flex gap-2">
                    {/* Refresh Button */}
                    <div
                      class="tooltip tooltip-bottom"
                      data-tip="Refresh Status"
                    >
                      <button
                        class="btn btn-ghost btn-sm hover:btn-primary/20"
                        onClick$={() => window.location.reload()}
                      >
                        <svg
                          class="h-4 w-4 transition-transform hover:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    {/* Export/Print Button */}
                    <div
                      class="tooltip tooltip-bottom"
                      data-tip="Print Schedule"
                    >
                      <button
                        class="btn btn-ghost btn-sm hover:btn-primary/20"
                        onClick$={() => window.print()}
                      >
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
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Section - Day Quick Jump */}
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-medium opacity-70 text-center">
                    Quick Jump
                  </span>
                  <div class="flex flex-wrap justify-center gap-1">
                    <button
                      class={`btn btn-xs ${
                        currentFilters.selectedDay === "All"
                          ? "btn-primary"
                          : "btn-ghost hover:btn-primary/20"
                      }`}
                      onClick$={handleAllFilter}
                    >
                      All
                    </button>
                    {activeDays.map((day) => (
                      <button
                        key={day}
                        class={`btn btn-xs ${
                          currentFilters.selectedDay === day
                            ? "btn-primary"
                            : day === currentDay
                              ? "btn-secondary btn-outline"
                              : "btn-ghost hover:btn-primary/20"
                        }`}
                        onClick$={() => handleQuickJump(day)}
                      >
                        {day === currentDay && (
                          <div class="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-current"></div>
                        )}
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Section - Settings */}
                <div class="flex items-center justify-center gap-3 lg:justify-end">
                  <div class="divider divider-horizontal hidden lg:flex"></div>

                  <span class="text-sm font-medium opacity-70 hidden lg:inline">
                    Settings
                  </span>

                  {/* Schedule Source Selector */}
                  <div class="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      class="btn btn-xs btn-ghost tooltip tooltip-bottom"
                      data-tip="Pilih Sumber Jadwal"
                    >
                      <svg
                        class="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14-7l2 8-2 8M9 12l-2-8-2 8"
                        />
                      </svg>
                      <span class="hidden lg:inline text-xs">
                        {getAvailableScheduleSources().find(
                          (s) => s.value === currentFilters.scheduleSource,
                        )?.label || "Combined"}
                      </span>
                    </div>
                    <ul
                      tabIndex={0}
                      class="menu dropdown-content w-64 rounded-box bg-base-100 p-2 shadow-xl border border-base-300 z-50"
                    >
                      {getAvailableScheduleSources().map((source) => (
                        <li key={source.value}>
                          <button
                            class={`flex flex-col gap-1 text-left ${
                              currentFilters.scheduleSource === source.value
                                ? "active"
                                : ""
                            }`}
                            onClick$={() =>
                              handleScheduleSourceChange(source.value)
                            }
                          >
                            <span class="font-medium">{source.label}</span>
                            <span class="text-xs opacity-60">
                              {source.description}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time Format Toggle */}
                  <TimeFormatToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacer */}
          <div
            class={`transition-all duration-500 ease-out ${isExpanded.value ? "h-4" : "h-0"}`}
          ></div>
        </div>

        {/* Floating Toggle Button */}
        <div
          class={`
        fixed top-24 right-6 z-50
        transition-all duration-700 ease-out
        ${
          isVisible.value
            ? "translate-y-4 opacity-100"
            : "-translate-y-full opacity-0"
        }
      `}
        >
          <div
            class="tooltip tooltip-left"
            data-tip={`${isExpanded.value ? "Hide" : "Show"} Toolbar (Ctrl+H)`}
          >
            <button
              onClick$={toggleExpanded}
              class={`
              btn btn-circle btn-sm shadow-lg
              transition-all duration-300 hover:scale-110
              ${
                isExpanded.value
                  ? "btn-primary hover:btn-primary-focus"
                  : "btn-secondary hover:btn-secondary-focus"
              }
            `}
            >
              <svg
                class={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded.value ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  },
);
