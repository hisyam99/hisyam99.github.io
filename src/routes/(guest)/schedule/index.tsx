import {
  component$,
  useSignal,
  useComputed$,
  useOnDocument,
  $,
  useStore,
} from "@builder.io/qwik";
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

// Enhanced state management
interface SchedulePageState {
  isLoading: boolean;
  error: string | null;
  retryCount: number;
}

export default component$(() => {
  // Animation refs with better naming
  const scheduleStaggerRef = useStaggerAnimation(200);
  const { ref: heroRef } = useScrollAnimation();
  const { ref: overviewRef } = useScrollAnimation();
  const { ref: contentRef } = useScrollAnimation();

  const breadcrumbs = useBreadcrumbs();

  // State management with proper initialization
  const pageState = useStore<SchedulePageState>({
    isLoading: false,
    error: null,
    retryCount: 0,
  });

  const filters = useSignal<ScheduleFilterOptions>({
    selectedDay: "All",
    scheduleType: "All",
    scheduleSource: "combined",
  });

  const viewMode = useSignal<"overview" | "daily">("overview");
  const isToolbarExpanded = useSignal(false);

  // Computed values for better performance
  const scheduleData = useComputed$(() => {
    try {
      return getScheduleBySource(filters.value.scheduleSource || "combined");
    } catch {
      pageState.error = "Failed to load schedule data";
      return { schedule: {}, semester: "Unknown" };
    }
  });

  const activeDays = useComputed$(() => {
    return getActiveDays(scheduleData.value, filters.value.scheduleSource);
  });

  const currentDay = useComputed$(() => {
    const day = getCurrentDay();
    return day || ("Senin" as DayOfWeek);
  });

  const filteredCourses = useComputed$(() => {
    if (filters.value.selectedDay === "All") {
      return null;
    }
    return getCoursesForDay(
      scheduleData.value,
      filters.value.selectedDay as DayOfWeek,
    );
  });

  const pageTitle = useComputed$(() => {
    const baseTitle = "Jadwal Kuliah";
    if (viewMode.value === "daily" && filters.value.selectedDay !== "All") {
      return `${baseTitle} - ${filters.value.selectedDay}`;
    }
    return baseTitle;
  });

  // Event handlers with proper optimization
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

  const handleToolbarToggle = $(() => {
    isToolbarExpanded.value = !isToolbarExpanded.value;
  });

  const handleRetry = $(() => {
    pageState.isLoading = true;
    pageState.error = null;
    pageState.retryCount++;

    // Simulate retry logic
    setTimeout(() => {
      pageState.isLoading = false;
    }, 1000);
  });

  // Global event listeners with proper cleanup
  useOnDocument(
    "scheduleFilterChange",
    $((event: Event) => {
      const customEvent = event as CustomEvent<ScheduleFilterOptions>;
      filters.value = { ...customEvent.detail };
    }),
  );

  useOnDocument(
    "scheduleViewModeChange",
    $((event: Event) => {
      const customEvent = event as CustomEvent<"overview" | "daily">;
      viewMode.value = customEvent.detail;
    }),
  );

  useOnDocument(
    "keydown",
    $((event: KeyboardEvent) => {
      // Keyboard shortcuts for better UX
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "1":
            event.preventDefault();
            handleViewToggle("overview");
            break;
          case "2":
            event.preventDefault();
            handleViewToggle("daily");
            break;
          case "t":
            event.preventDefault();
            handleToolbarToggle();
            break;
        }
      }
    }),
  );

  return (
    <main class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Enhanced Schedule Toolbar */}
      <div
        class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isToolbarExpanded.value ? "translate-y-0" : "-translate-y-full md:translate-y-0"}`}
      >
        <ScheduleToolbar
          activeDays={activeDays.value}
          currentFilters={filters.value}
        />
      </div>

      {/* Mobile Toolbar Toggle */}
      <div class="fixed top-4 right-4 z-[60] md:hidden">
        <button
          class="btn btn-circle btn-primary shadow-lg"
          onClick$={handleToolbarToggle}
          aria-label="Toggle schedule toolbar"
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
              d={
                isToolbarExpanded.value
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Hero Section with Enhanced Design */}
      <section
        ref={heroRef}
        class="relative overflow-hidden pt-24 md:pt-32 pb-16"
      >
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iNyIvPgo8L2c+CjwvZz4KPC9zdmc+')]"></div>
        </div>

        <div class="container mx-auto px-4 relative">
          {/* Enhanced Breadcrumbs */}
          <div
            class="mb-8 opacity-0 animate-fade-in-up"
            style="animation-delay: 0.1s"
          >
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          <div class="text-center space-y-6">
            {/* Badge with Animation */}
            <div
              class="opacity-0 animate-fade-in-up"
              style="animation-delay: 0.2s"
            >
              <div class="inline-flex items-center gap-2 badge badge-primary badge-lg px-6 py-3 text-sm font-medium">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {scheduleData.value.semester}
              </div>
            </div>

            {/* Enhanced Title */}
            <div
              class="opacity-0 animate-fade-in-up"
              style="animation-delay: 0.3s"
            >
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {pageTitle.value}
              </h1>
              <div class="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>

            {/* Enhanced Description */}
            <div
              class="opacity-0 animate-fade-in-up"
              style="animation-delay: 0.4s"
            >
              <p class="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Kelola dan pantau jadwal perkuliahan semester{" "}
                <span class="font-semibold text-primary">
                  {scheduleData.value.semester}
                </span>{" "}
                dengan mudah. Lihat mata kuliah, waktu, dan informasi dosen
                secara lengkap.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            class="w-6 h-6 text-base-content/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Live Class Banner with Enhanced Design */}
      <section class="py-8 relative">
        <div class="container mx-auto px-4">
          <div
            class="opacity-0 animate-fade-in-up"
            style="animation-delay: 0.1s"
          >
            <LiveClassBanner scheduleData={scheduleData.value} />
          </div>
        </div>
      </section>

      {/* Enhanced Quick Stats & Current Day */}
      <section ref={overviewRef} class="py-16 relative">
        <div class="container mx-auto px-4">
          <div
            class="opacity-0 animate-fade-in-up"
            style="animation-delay: 0.2s"
          >
            <ScheduleOverview
              scheduleData={scheduleData.value}
              currentDay={currentDay.value}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Filters and View Toggle */}
      <section class="py-8 relative">
        <div class="container mx-auto px-4">
          <div class="card bg-base-100/80 backdrop-blur-lg shadow-lg border border-base-300/50">
            <div class="card-body p-4 md:p-6">
              <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* View Mode Toggle with Enhanced Design */}
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span class="text-sm font-semibold text-base-content/80">
                      Mode Tampilan
                    </span>
                  </div>

                  <div class="join shadow-md">
                    <input
                      class="join-item btn btn-lg"
                      type="radio"
                      name="view-mode"
                      aria-label="Overview"
                      checked={viewMode.value === "overview"}
                      onChange$={() => handleViewToggle("overview")}
                    />
                    <input
                      class="join-item btn btn-lg"
                      type="radio"
                      name="view-mode"
                      aria-label="Daily"
                      checked={viewMode.value === "daily"}
                      onChange$={() => handleViewToggle("daily")}
                    />
                  </div>

                  <div class="text-xs text-base-content/60 mt-1">
                    Shortcut: Ctrl+1 (Overview), Ctrl+2 (Daily)
                  </div>
                </div>

                {/* Enhanced Day Filter */}
                <div class="flex flex-col gap-3 flex-1 lg:max-w-2xl">
                  <div class="flex items-center gap-2">
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
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                      />
                    </svg>
                    <span class="text-sm font-semibold text-base-content/80">
                      Filter Hari
                    </span>
                    <div class="badge badge-sm badge-outline">
                      {activeDays.value.length} hari aktif
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <button
                      class={`btn btn-sm transition-all duration-200 ${
                        filters.value.selectedDay === "All"
                          ? "btn-primary shadow-lg"
                          : "btn-outline hover:btn-primary"
                      }`}
                      onClick$={() => handleDayFilter("All")}
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Semua Hari
                    </button>

                    {activeDays.value.map((day) => {
                      const isSelected = filters.value.selectedDay === day;
                      const isToday = day === currentDay.value;
                      const coursesCount = getCoursesForDay(
                        scheduleData.value,
                        day,
                      ).length;

                      return (
                        <button
                          key={day}
                          class={`btn btn-sm transition-all duration-200 gap-2 ${
                            isSelected
                              ? "btn-primary shadow-lg"
                              : isToday
                                ? "btn-secondary btn-outline hover:btn-secondary shadow-md"
                                : "btn-outline hover:btn-primary"
                          }`}
                          onClick$={() => handleDayFilter(day)}
                        >
                          {isToday && (
                            <div class="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                          )}
                          <span>{day}</span>
                          <div class="badge badge-xs badge-neutral">
                            {coursesCount}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {filters.value.selectedDay !== "All" && (
                    <div class="text-xs text-base-content/60">
                      📊 {filteredCourses.value?.length || 0} mata kuliah pada{" "}
                      {filters.value.selectedDay}
                    </div>
                  )}
                </div>
              </div>

              {/* Advanced Filters (Collapsible) */}
              <div class="collapse collapse-arrow bg-base-200/50 rounded-xl mt-6">
                <input type="checkbox" class="peer" />
                <div class="collapse-title text-sm font-medium flex items-center gap-2">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                  Filter Lanjutan
                  <div class="badge badge-xs badge-primary">Beta</div>
                </div>
                <div class="collapse-content space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Jenis Jadwal</span>
                      </label>
                      <select class="select select-bordered select-sm">
                        <option>Semua Jenis</option>
                        <option>Reguler</option>
                        <option>Praktikum</option>
                      </select>
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Rentang Waktu</span>
                      </label>
                      <select class="select select-bordered select-sm">
                        <option>Semua Waktu</option>
                        <option>Pagi (07:00-12:00)</option>
                        <option>Siang (12:00-17:00)</option>
                        <option>Sore (17:00-21:00)</option>
                      </select>
                    </div>

                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Sortir</span>
                      </label>
                      <select class="select select-bordered select-sm">
                        <option>Waktu</option>
                        <option>Nama Mata Kuliah</option>
                        <option>SKS</option>
                        <option>Dosen</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Schedule Content */}
      <section ref={contentRef} id="schedule-content" class="py-16 relative">
        <div class="container mx-auto px-4">
          {/* Error State */}
          {pageState.error && (
            <div class="alert alert-error shadow-lg mb-8">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="font-bold">Terjadi Kesalahan!</h3>
                <div class="text-xs">{pageState.error}</div>
              </div>
              <button class="btn btn-sm btn-outline" onClick$={handleRetry}>
                Coba Lagi{" "}
                {pageState.retryCount > 0 && `(${pageState.retryCount})`}
              </button>
            </div>
          )}

          {/* Loading State */}
          {pageState.isLoading && (
            <div class="flex justify-center items-center py-16">
              <div class="loading loading-spinner loading-lg text-primary"></div>
              <span class="ml-4 text-lg">Memuat jadwal...</span>
            </div>
          )}

          {/* Content */}
          {!pageState.isLoading && !pageState.error && (
            <>
              {viewMode.value === "overview" ? (
                // Overview Mode - Enhanced All Days View
                <div class="space-y-6">
                  <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold mb-4">Ringkasan Mingguan</h2>
                    <p class="text-base-content/70 max-w-2xl mx-auto">
                      Lihat semua jadwal dalam satu minggu. Mata kuliah
                      ditampilkan berdasarkan hari untuk memudahkan perencanaan.
                    </p>
                  </div>

                  <div
                    ref={scheduleStaggerRef}
                    class="stagger-container space-y-6"
                  >
                    {activeDays.value.map((day) => {
                      const courses = getCoursesForDay(scheduleData.value, day);
                      return (
                        <div key={day} class="stagger-item">
                          <DaySchedule
                            day={day}
                            courses={courses}
                            isToday={day === currentDay.value}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {activeDays.value.length === 0 && (
                    <div class="card bg-base-100 shadow-xl">
                      <div class="card-body text-center py-16">
                        <svg
                          class="w-24 h-24 mx-auto text-base-content/20 mb-4"
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
                        <h3 class="text-2xl font-bold mb-2">
                          Tidak Ada Jadwal
                        </h3>
                        <p class="text-base-content/70">
                          Belum ada jadwal kuliah yang tersedia untuk semester
                          ini.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Daily Mode - Enhanced Single Day View
                <div class="space-y-8">
                  {filters.value.selectedDay &&
                  filters.value.selectedDay !== "All" ? (
                    <>
                      <div class="text-center mb-8">
                        <div class="breadcrumbs justify-center mb-4">
                          <ul>
                            <li>
                              <button
                                onClick$={() => handleViewToggle("overview")}
                              >
                                Overview
                              </button>
                            </li>
                            <li class="font-semibold">
                              {filters.value.selectedDay}
                            </li>
                          </ul>
                        </div>
                        <h2 class="text-2xl font-bold mb-2">
                          Jadwal {filters.value.selectedDay}
                        </h2>
                        <p class="text-base-content/70">
                          Detail lengkap mata kuliah pada hari{" "}
                          {filters.value.selectedDay}
                        </p>
                      </div>

                      <DaySchedule
                        day={filters.value.selectedDay}
                        courses={filteredCourses.value || []}
                        isToday={filters.value.selectedDay === currentDay.value}
                        detailed={true}
                      />
                    </>
                  ) : (
                    // Day Selection Prompt
                    <div class="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl">
                      <div class="card-body text-center py-16">
                        <div class="mb-8">
                          <svg
                            class="w-32 h-32 mx-auto text-primary/30 mb-6"
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

                        <h3 class="card-title text-2xl justify-center mb-4">
                          Pilih Hari untuk Melihat Detail
                        </h3>
                        <p class="text-base-content/70 mb-8 max-w-lg mx-auto">
                          Silakan pilih hari dari filter di atas untuk melihat
                          jadwal lengkap dengan informasi detail mata kuliah.
                        </p>

                        {/* Quick Day Selection */}
                        <div class="flex flex-wrap justify-center gap-3 mb-6">
                          {activeDays.value.slice(0, 3).map((day) => (
                            <button
                              key={day}
                              class="btn btn-outline btn-lg gap-2"
                              onClick$={() => handleDayFilter(day)}
                            >
                              {day === currentDay.value && (
                                <div class="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                              )}
                              {day}
                            </button>
                          ))}
                        </div>

                        <div class="text-sm text-base-content/60">
                          Atau gunakan filter di atas untuk memilih hari lainnya
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      <div class="fixed bottom-8 right-8 z-50">
        <button
          class="btn btn-circle btn-primary shadow-lg opacity-80 hover:opacity-100 transition-opacity"
          onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(2rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }

          .stagger-container .stagger-item {
            opacity: 0;
            transform: translateY(2rem);
            animation: fade-in-up 0.6s ease-out forwards;
          }

          .stagger-container .stagger-item:nth-child(1) { animation-delay: 0.1s; }
          .stagger-container .stagger-item:nth-child(2) { animation-delay: 0.2s; }
          .stagger-container .stagger-item:nth-child(3) { animation-delay: 0.3s; }
          .stagger-container .stagger-item:nth-child(4) { animation-delay: 0.4s; }
          .stagger-container .stagger-item:nth-child(5) { animation-delay: 0.5s; }
          .stagger-container .stagger-item:nth-child(n+6) { animation-delay: 0.6s; }

          html {
            scroll-behavior: smooth;
          }

          .btn:focus-visible {
            outline: 2px solid hsl(var(--p));
            outline-offset: 2px;
          }

          .card:hover {
            transform: translateY(-1px);
            transition: transform 0.2s ease-out;
          }

          .loading {
            animation: spin 1s linear infinite;
          }
      `}</style>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Jadwal Kuliah - Muhammad Hisyam Kamil | Modern Schedule Management",
  meta: [
    {
      name: "description",
      content:
        "Jadwal kuliah interaktif semester Ganjil 2025/2026 Muhammad Hisyam Kamil dengan fitur modern, responsive design, dan user experience terbaik. Lihat mata kuliah, waktu, dosen, dan lokasi dengan mudah.",
    },
    {
      name: "keywords",
      content:
        "jadwal kuliah, schedule, university, informatika, hisyam99, modern UI, responsive design",
    },
    {
      name: "author",
      content: "Muhammad Hisyam Kamil",
    },
    {
      property: "og:title",
      content: "Jadwal Kuliah - Muhammad Hisyam Kamil",
    },
    {
      property: "og:description",
      content:
        "Sistem manajemen jadwal kuliah modern dengan fitur interaktif dan design responsif.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "theme-color",
      content: "#570df8",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: "https://hisyam99.com/schedule",
    },
  ],
};
