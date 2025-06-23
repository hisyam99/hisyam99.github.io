import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div class="absolute inset-0 -z-10">
        <div class="from-primary/10 to-secondary/10 absolute inset-0 bg-gradient-to-br via-transparent"></div>
        <div class="bg-primary/20 absolute top-20 left-20 h-72 w-72 animate-pulse rounded-full blur-3xl"></div>
        <div class="bg-secondary/20 absolute right-20 bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          {/* 404 Animation */}
          <div class="relative">
            <h1 class="text-base-content/10 text-[150px] font-bold select-none md:text-[200px]">
              404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-6xl font-bold md:text-8xl">
                <span class="text-primary">4</span>
                <span class="text-base-content inline-block animate-bounce">
                  0
                </span>
                <span class="text-secondary">4</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div class="mt-8 space-y-6">
            <h2 class="text-3xl font-bold md:text-4xl">Oops! Page Not Found</h2>

            <p class="text-base-content/70 mx-auto max-w-md text-lg">
              Sepertinya halaman yang kamu cari belum ada atau sudah
              dipindahkan. Tapi jangan khawatir, masih banyak hal menarik yang
              bisa kamu explore!
            </p>

            {/* Fun illustration */}
            <div class="py-8">
              <svg
                class="text-base-content/20 mx-auto h-64 w-64"
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

            {/* Action Buttons */}
            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/" class="btn btn-primary">
                <svg
                  class="mr-2 h-5 w-5"
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
              </Link>

              <Link href="/blog" class="btn btn-outline">
                Read My Blog
              </Link>

              <Link href="/#contact" class="btn btn-ghost">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div class="bg-base-200 mt-12 rounded-lg p-6">
            <p class="text-base-content/70 mb-4">
              Or try searching for what you need:
            </p>
            <div class="form-control">
              <div class="input-group justify-center">
                <input
                  type="text"
                  placeholder="Search..."
                  class="input input-bordered w-full max-w-xs"
                />
                <button class="btn btn-square btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
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
