import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";
import type { DayOfWeek, ScheduleFilterOptions } from "~/types/schedule";
import { DaySchedule } from "~/components/Schedule/DaySchedule";
import { ScheduleOverview } from "~/components/Schedule/ScheduleOverview";
import { LiveClassBanner } from "~/components/Schedule/LiveClassBanner";
import { ScheduleToolbar } from "~/components/Schedule/ScheduleToolbar";
import {
  getActiveDays,
  getCurrentDay,
  getCoursesForDay,
  getScheduleBySource,
} from "~/utils/schedule";
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

export default component$(() => {
  const scheduleStaggerRef = useStaggerAnimation(200);
  const { ref: overviewRef } = useScrollAnimation();
  const { ref: scheduleRef } = useScrollAnimation();
  const breadcrumbs = useBreadcrumbs();

  const filters = useSignal<ScheduleFilterOptions>({
    selectedDay: "All",
    scheduleType: "All",
    scheduleSource: "combined",
  });
  const viewMode = useSignal<"overview" | "daily">("overview");

  // Get schedule data based on current filter
  const scheduleData = getScheduleBySource(
    filters.value.scheduleSource || "combined",
  );
  const activeDays = getActiveDays(scheduleData, filters.value.scheduleSource);
  const currentDay = getCurrentDay();

  const handleDayFilter = $((day: DayOfWeek | "All") => {
    filters.value = { ...filters.value, selectedDay: day };
    if (day !== "All") {
      viewMode.value = "daily";
    }
  });

  const handleViewToggle = $((mode: "overview" | "daily") => {
    viewMode.value = mode;
    if (mode === "overview") {
      filters.value = { ...filters.value, selectedDay: "All" };
    }
  });

  // Listen for custom events from toolbar
  useOnWindow(
    "scheduleFilterChange",
    $((event: Event) => {
      const customEvent = event as CustomEvent<ScheduleFilterOptions>;
      filters.value = { ...customEvent.detail };
    }),
  );

  useOnWindow(
    "scheduleViewModeChange",
    $((event: Event) => {
      const customEvent = event as CustomEvent<"overview" | "daily">;
      viewMode.value = customEvent.detail;
    }),
  );

  return (
    <>
      {/* Schedule Toolbar */}
      <ScheduleToolbar activeDays={activeDays} currentFilters={filters.value} />

      {/* Hero Section - Dynamic padding based on toolbar state */}
      <section class="from-base-200 to-base-300 bg-gradient-to-br py-20 pt-40 transition-all duration-500">
        <div class="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div class="mb-6 text-left">
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          <div class="animate-fadeInDown text-center">
            <div class="mb-8">
              <div class="badge badge-primary badge-lg mb-4">
                {scheduleData.semester}
              </div>
              <h1 class="animate-textReveal mb-4 text-5xl font-bold">
                <span class="text-gradient">Jadwal Kuliah</span>
              </h1>
              <div
                class="bg-primary animate-scaleInCenter mx-auto h-1 w-24"
                style="animation-delay: 0.3s"
              ></div>
            </div>
            <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
              Kelola dan pantau jadwal perkuliahan semester{" "}
              {scheduleData.semester}
              dengan mudah. Lihat mata kuliah, waktu, dan informasi dosen secara
              lengkap.
            </p>
          </div>
        </div>
      </section>

      {/* Live Class Banner */}
      <section class="py-8">
        <div class="container mx-auto px-4">
          <LiveClassBanner scheduleData={scheduleData} />
        </div>
      </section>

      {/* Quick Stats & Current Day */}
      <section ref={overviewRef} class="py-16">
        <div class="container mx-auto px-4">
          <ScheduleOverview
            scheduleData={scheduleData}
            currentDay={currentDay}
          />
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* View Mode Toggle */}
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-medium opacity-70">
                    Mode Tampilan
                  </span>
                  <div class="btn-group">
                    <button
                      class={`btn btn-sm ${viewMode.value === "overview" ? "btn-primary" : "btn-outline"}`}
                      onClick$={() => handleViewToggle("overview")}
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        ></path>
                      </svg>
                      Overview
                    </button>
                    <button
                      class={`btn btn-sm ${viewMode.value === "daily" ? "btn-primary" : "btn-outline"}`}
                      onClick$={() => handleViewToggle("daily")}
                    >
                      <svg
                        class="mr-2 h-4 w-4"
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
                      Harian
                    </button>
                  </div>
                </div>

                {/* Day Filter */}
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-medium opacity-70">
                    Filter Hari
                  </span>
                  <div class="flex flex-wrap gap-2">
                    <button
                      class={`btn btn-sm ${filters.value.selectedDay === "All" ? "btn-primary" : "btn-outline"}`}
                      onClick$={() => handleDayFilter("All")}
                    >
                      Semua Hari
                    </button>
                    {activeDays.map((day) => (
                      <button
                        key={day}
                        class={`btn btn-sm ${
                          filters.value.selectedDay === day
                            ? "btn-primary"
                            : day === currentDay
                              ? "btn-secondary btn-outline"
                              : "btn-outline"
                        }`}
                        onClick$={() => handleDayFilter(day)}
                      >
                        {day === currentDay && (
                          <div class="mr-1 h-2 w-2 animate-pulse rounded-full bg-current"></div>
                        )}
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section ref={scheduleRef} id="schedule-content" class="py-16">
        <div class="container mx-auto px-4">
          {viewMode.value === "overview" ? (
            // Overview Mode - All Days
            <div ref={scheduleStaggerRef} class="stagger-container space-y-8">
              {activeDays.map((day) => {
                const courses = getCoursesForDay(scheduleData, day);
                return (
                  <DaySchedule
                    key={day}
                    day={day}
                    courses={courses}
                    isToday={day === currentDay}
                  />
                );
              })}
            </div>
          ) : (
            // Daily Mode - Single Day
            <div>
              {filters.value.selectedDay &&
              filters.value.selectedDay !== "All" ? (
                <DaySchedule
                  day={filters.value.selectedDay}
                  courses={getCoursesForDay(
                    scheduleData,
                    filters.value.selectedDay,
                  )}
                  isToday={filters.value.selectedDay === currentDay}
                  detailed={true}
                />
              ) : (
                <div class="text-center">
                  <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                      <h3 class="card-title justify-center">Pilih Hari</h3>
                      <p class="text-base-content/70">
                        Silakan pilih hari untuk melihat jadwal detail
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Jadwal Kuliah - Muhammad Hisyam Kamil",
  meta: [
    {
      name: "description",
      content:
        "Jadwal kuliah semester Ganjil 2025/2026 Muhammad Hisyam Kamil dengan detail mata kuliah, waktu, dan informasi dosen.",
    },
    {
      name: "keywords",
      content: "jadwal kuliah, schedule, university, informatika, hisyam99",
    },
  ],
};
