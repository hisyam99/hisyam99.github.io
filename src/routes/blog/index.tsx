import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import ImgReparin from "~/media/reparin.png?jsx";
import ImgXZ from "~/media/blog/xz-manpage.avif?jsx";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

export default component$(() => {
  const { ref: blogRef } = useScrollAnimation();
  const blogStaggerRef = useStaggerAnimation(150);

  return (
    <section ref={blogRef} class="min-h-screen py-20 pt-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="mb-8 text-center sm:mb-12">
          <h1 class="animate-textReveal mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <div class="bg-primary animate-scaleInCenter mx-auto mb-6 h-1 w-16 sm:mb-8 sm:w-20"></div>
          <p class="text-content-secondary mx-auto max-w-2xl px-4 text-base sm:px-0 sm:text-lg">
            Thoughts, tutorials, and insights about web development, technology,
            and my journey as a developer.
          </p>
        </div>

        {/* Search and Filter */}
        <div class="animate-fadeInUp mb-8 flex flex-col gap-4 sm:mb-12">
          {/* Filter Buttons */}
          <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button class="btn btn-primary btn-sm sm:btn-md hover-scale">
              All Posts
            </button>
            <button class="btn btn-ghost btn-sm sm:btn-md hover-scale">
              Tutorials
            </button>
            <button class="btn btn-ghost btn-sm sm:btn-md hover-scale">
              Tech News
            </button>
            <button class="btn btn-ghost btn-sm sm:btn-md hover-scale">
              Projects
            </button>
          </div>

          {/* Search Bar */}
          <div class="mx-auto w-full max-w-md">
            <div class="join w-full">
              <input
                type="text"
                placeholder="Search articles..."
                class="input input-bordered join-item focus:input-primary w-full flex-1"
              />
              <button
                class="btn btn-primary join-item hover-scale"
                aria-label="Search articles"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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

        {/* Featured Post */}
        <div class="animate-slideInBlur mb-8 sm:mb-12">
          <div class="card lg:card-side bg-base-200 hover-lift shadow-xl">
            <figure class="h-64 sm:h-72 lg:h-auto lg:w-1/2">
              <ImgReparin class="h-full w-full object-cover" alt="Reparin" />
            </figure>
            <div class="card-body p-4 sm:p-6 lg:w-1/2 lg:p-8">
              <div class="badge badge-secondary mb-2 text-xs sm:text-sm">
                Featured
              </div>
              <h2 class="card-title text-xl leading-tight sm:text-2xl lg:text-3xl">
                Reparin: #MauService? Reparin aja!
              </h2>

              {/* Meta Information */}
              <div class="text-content-secondary mb-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
                <span class="flex items-center gap-1">
                  <svg
                    class="h-3 w-3 sm:h-4 sm:w-4"
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
                  <span class="hidden sm:inline">Muhammad Hisyam Kamil</span>
                  <span class="sm:hidden">hisyam99</span>
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    class="h-3 w-3 sm:h-4 sm:w-4"
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
                  June 11, 2024
                </span>
                <span class="flex items-center gap-1">
                  <svg
                    class="h-3 w-3 sm:h-4 sm:w-4"
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
                  5 min read
                </span>
              </div>

              <p class="mb-4 text-sm leading-relaxed sm:mb-6 sm:text-base lg:text-lg">
                Reparin adalah platform inovatif yang menghubungkan pengguna
                dengan teknisi perbaikan gadget terpercaya. Dibangun dengan
                teknologi modern untuk memberikan pengalaman terbaik dalam
                mencari solusi perbaikan perangkat elektronik Anda.
              </p>

              {/* Tags */}
              <div class="mb-4 flex flex-wrap gap-1 sm:mb-6 sm:gap-2">
                <div class="badge badge-outline text-xs">Startup</div>
                <div class="badge badge-outline text-xs">Technology</div>
                <div class="badge badge-outline text-xs">Next.js</div>
                <div class="badge badge-outline text-xs">Golang</div>
              </div>

              <div class="card-actions">
                <Link
                  href="https://reparin.my.id/about"
                  target="_blank"
                  class="btn btn-primary btn-sm sm:btn-md hover-scale"
                >
                  <span class="hidden sm:inline">Read More</span>
                  <span class="sm:hidden">Read</span>
                  <svg
                    class="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div
          ref={blogStaggerRef}
          class="stagger-container grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {/* Blog Post 1 */}
          <article class="card bg-base-100 hover-lift hover-glow shadow-xl">
            <figure class="h-44 sm:h-48">
              <ImgXZ class="h-full w-full object-cover" alt="XZ Backdoor" />
            </figure>
            <div class="card-body p-4 sm:p-6">
              <div class="mb-2 flex items-center gap-1 sm:gap-2">
                <div class="badge badge-primary text-xs">Linux</div>
                <div class="badge badge-error text-xs">Security</div>
              </div>
              <h2 class="card-title mb-2 text-base leading-tight sm:text-lg">
                Arch Linux: Paket xz telah di-backdoor
              </h2>
              <p class="text-content-secondary mb-4 text-sm leading-relaxed">
                Critical security alert: The upstream release tarballs for xz
                versions 5.6.0 and 5.6.1 contain malicious code that introduces
                a backdoor.
              </p>
              <div class="text-content-tertiary mb-4 flex items-center justify-between text-xs sm:text-sm">
                <span class="truncate">David Runge</span>
                <span class="whitespace-nowrap">March 29, 2024</span>
              </div>
              <div class="card-actions justify-end">
                <Link
                  href="https://archlinux.org/news/the-xz-package-has-been-backdoored"
                  target="_blank"
                  class="btn btn-ghost btn-sm hover-scale text-xs sm:text-sm"
                >
                  <span class="hidden sm:inline">Read More →</span>
                  <span class="sm:hidden">Read →</span>
                </Link>
              </div>
            </div>
          </article>

          {/* Blog Post 2 - Placeholder */}
          <article class="card bg-base-100 hover-lift hover-glow shadow-xl">
            <figure class="from-primary to-secondary h-44 bg-gradient-to-br sm:h-48">
              <div class="flex h-full w-full items-center justify-center">
                <svg
                  class="text-base-100 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
            </figure>
            <div class="card-body p-4 sm:p-6">
              <div class="mb-2 flex items-center gap-1 sm:gap-2">
                <div class="badge badge-secondary text-xs">Tutorial</div>
                <div class="badge badge-accent text-xs">Web Dev</div>
              </div>
              <h2 class="card-title mb-2 text-base leading-tight sm:text-lg">
                Building Modern Web Apps with Qwik
              </h2>
              <p class="text-content-secondary mb-4 text-sm leading-relaxed">
                Learn how to build blazing fast web applications with Qwik
                framework. Explore the benefits of resumability and lazy
                loading.
              </p>
              <div class="text-content-tertiary mb-4 flex items-center justify-between text-xs sm:text-sm">
                <span class="truncate">hisyam99</span>
                <span class="whitespace-nowrap">Coming Soon</span>
              </div>
              <div class="card-actions justify-end">
                <button
                  class="btn btn-ghost btn-sm text-xs sm:text-sm"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </article>

          {/* Blog Post 3 - Skeleton */}
          <article class="card bg-base-100 shadow-xl">
            <figure class="h-44 sm:h-48">
              <div class="skeleton h-full w-full"></div>
            </figure>
            <div class="card-body p-4 sm:p-6">
              <div class="mb-2 flex gap-1 sm:gap-2">
                <div class="skeleton h-5 w-12 sm:h-6 sm:w-16"></div>
                <div class="skeleton h-5 w-16 sm:h-6 sm:w-20"></div>
              </div>
              <div class="skeleton mb-2 h-6 w-full sm:h-8"></div>
              <div class="skeleton mb-1 h-3 w-full sm:h-4"></div>
              <div class="skeleton mb-4 h-3 w-3/4 sm:h-4"></div>
              <div class="mb-4 flex items-center justify-between">
                <div class="skeleton h-3 w-20 sm:h-4 sm:w-24"></div>
                <div class="skeleton h-3 w-16 sm:h-4 sm:w-20"></div>
              </div>
              <div class="card-actions justify-end">
                <div class="skeleton h-6 w-20 sm:h-8 sm:w-24"></div>
              </div>
            </div>
          </article>

          {/* More skeleton posts */}
          {Array.from({ length: 3 }, (_, i) => (
            <article
              key={`skeleton-placeholder-${i + 1}`}
              class="card bg-base-100 shadow-xl"
            >
              <figure class="h-44 sm:h-48">
                <div class="skeleton h-full w-full"></div>
              </figure>
              <div class="card-body p-4 sm:p-6">
                <div class="mb-2 flex gap-1 sm:gap-2">
                  <div class="skeleton h-5 w-12 sm:h-6 sm:w-16"></div>
                  <div class="skeleton h-5 w-16 sm:h-6 sm:w-20"></div>
                </div>
                <div class="skeleton mb-2 h-6 w-full sm:h-8"></div>
                <div class="skeleton mb-1 h-3 w-full sm:h-4"></div>
                <div class="skeleton mb-4 h-3 w-3/4 sm:h-4"></div>
                <div class="mb-4 flex items-center justify-between">
                  <div class="skeleton h-3 w-20 sm:h-4 sm:w-24"></div>
                  <div class="skeleton h-3 w-16 sm:h-4 sm:w-20"></div>
                </div>
                <div class="card-actions justify-end">
                  <div class="skeleton h-6 w-20 sm:h-8 sm:w-24"></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div class="animate-fadeInUp mt-8 flex justify-center sm:mt-12">
          <div class="join">
            <button class="join-item btn btn-sm sm:btn-md hover-scale">
              «
            </button>
            <button class="join-item btn btn-sm sm:btn-md btn-active">1</button>
            <button class="join-item btn btn-sm sm:btn-md hover-scale">
              2
            </button>
            <button class="join-item btn btn-sm sm:btn-md hover-scale">
              3
            </button>
            <button class="join-item btn btn-sm sm:btn-md btn-disabled">
              ...
            </button>
            <button class="join-item btn btn-sm sm:btn-md hover-scale">
              »
            </button>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div class="animate-scaleInCenter mt-12 sm:mt-16 lg:mt-20">
          <div class="card from-primary to-secondary text-primary-content hover-glow bg-gradient-to-r">
            <div class="card-body px-4 py-8 text-center sm:px-6 sm:py-10 lg:py-12">
              <h2 class="card-title mb-3 justify-center text-xl sm:mb-4 sm:text-2xl lg:text-3xl">
                Stay Updated
              </h2>
              <p class="mx-auto mb-4 max-w-2xl text-sm leading-relaxed sm:mb-6 sm:text-base lg:text-lg">
                Subscribe to my newsletter and never miss a post. Get the latest
                articles, tutorials, and insights delivered straight to your
                inbox.
              </p>
              <div class="mx-auto flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-md sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="input input-bordered text-base-content focus:input-accent w-full text-sm sm:text-base"
                />
                <button class="btn btn-accent btn-sm sm:btn-md hover-scale w-full sm:w-auto">
                  <span class="text-sm sm:text-base">Subscribe</span>
                  <svg
                    class="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
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
  title: "Blog - Muhammad Hisyam Kamil",
  meta: [
    {
      name: "description",
      content:
        "Read my latest articles about web development, technology, and programming.",
    },
  ],
};
