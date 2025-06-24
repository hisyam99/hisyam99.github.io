import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20 sm:pt-28 md:pt-32">
      {/* Enhanced animated background */}
      <div class="absolute inset-0 -z-10">
        <div class="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br via-transparent"></div>
        <div class="bg-primary/20 absolute top-20 left-20 h-64 w-64 animate-pulse rounded-full blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-96"></div>
        <div class="bg-secondary/20 absolute right-20 bottom-20 h-72 w-72 animate-pulse rounded-full blur-3xl sm:h-96 sm:w-96 md:h-[500px] md:w-[500px]"></div>
        <div class="bg-accent/15 absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full blur-2xl sm:h-48 sm:w-48 md:h-64 md:w-64"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl">
          <div class="text-center">
            {/* 404 Animation with glass effect */}
            <div class="relative mb-8 sm:mb-12">
              <h1 class="text-base-content/5 text-[100px] font-bold select-none sm:text-[150px] md:text-[200px] lg:text-[250px]">
                404
              </h1>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-4xl font-bold sm:text-6xl md:text-8xl lg:text-9xl">
                  <span class="text-primary drop-shadow-lg">4</span>
                  <span class="text-base-content inline-block animate-bounce drop-shadow-lg">
                    0
                  </span>
                  <span class="text-secondary drop-shadow-lg">4</span>
                </div>
              </div>
            </div>

            {/* Error Message with glass background */}
            <div class="space-y-6 sm:space-y-8">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8">
                <h2 class="from-primary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                  Oops! Page Not Found
                </h2>

                <p class="text-base-content/70 mx-auto max-w-md text-sm leading-relaxed sm:max-w-lg sm:text-base md:text-lg">
                  Sepertinya halaman yang kamu cari belum ada atau sudah
                  dipindahkan. Tapi jangan khawatir, masih banyak hal menarik
                  yang bisa kamu explore!
                </p>
              </div>

              {/* Fun illustration with glass background */}
              <div class="py-6 sm:py-8">
                <div class="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:h-40 sm:w-40 md:h-48 md:w-48">
                  <svg
                    class="text-base-content/30 h-16 w-16 animate-pulse sm:h-20 sm:w-20 md:h-24 md:w-24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="0.5"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Action Buttons with glass effect */}
              <div class="space-y-4 sm:space-y-6">
                <div class="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href="/"
                    class="group bg-primary/20 border-primary/30 hover:bg-primary/30 relative w-full rounded-2xl border px-6 py-3 backdrop-blur-md transition-all duration-300 sm:w-auto sm:px-8 sm:py-4"
                  >
                    <div class="text-primary flex items-center justify-center text-sm font-semibold sm:text-base">
                      <svg
                        class="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                      Back to Home
                    </div>
                  </Link>

                  <Link
                    href="/blog"
                    class="group relative w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4"
                  >
                    <div class="text-base-content flex items-center justify-center text-sm font-semibold sm:text-base">
                      <svg
                        class="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Read My Blog
                    </div>
                  </Link>

                  <Link
                    href="/#contact"
                    class="group relative w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4"
                  >
                    <div class="text-base-content flex items-center justify-center text-sm font-semibold sm:text-base">
                      <svg
                        class="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Contact Me
                    </div>
                  </Link>
                </div>
              </div>

              {/* Search Suggestion with enhanced glass */}
              <div class="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:mt-12 sm:rounded-3xl sm:p-6 md:p-8">
                <p class="text-base-content/70 mb-4 text-sm sm:mb-6 sm:text-base">
                  Or try searching for what you need:
                </p>
                <div class="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-0">
                  <div class="relative mx-auto max-w-xs flex-1 sm:mx-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="focus:border-primary/50 text-base-content placeholder-base-content/50 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 outline-none focus:bg-white/15 sm:rounded-l-xl sm:rounded-r-none sm:text-base"
                    />
                  </div>
                  <button class="bg-primary/20 border-primary/30 hover:bg-primary/30 text-primary group rounded-xl border px-6 py-3 font-semibold backdrop-blur-sm transition-all duration-300 sm:rounded-l-none sm:rounded-r-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "404 - Page Not Found | Muhammad Hisyam Kamil",
  meta: [
    {
      name: "description",
      content:
        "The page you're looking for doesn't exist. Let's get you back on track!",
    },
  ],
};
