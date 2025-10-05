import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import Hero from "~/components/starter/hero/hero";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";
import { getPublishedBlogs } from "~/services/blog";
import { getProjects } from "~/services/project";
import { getCategories } from "~/services/category";

/**
 * Homepage data loader
 * Loads featured content for the homepage
 */
export const useHomepageDataLoader = routeLoader$(async () => {
  try {
    const [blogs, projects, categories] = await Promise.allSettled([
      getPublishedBlogs({
        page: 1,
        pageSize: 3,
        sortBy: "publishedAt",
        sortDirection: "DESC",
      }),
      getProjects({
        page: 1,
        pageSize: 4,
        sortBy: "createdAt",
        sortDirection: "DESC",
      }),
      getCategories({
        page: 1,
        pageSize: 10,
        sortBy: "name",
        sortDirection: "ASC",
      }),
    ]);

    return {
      featuredBlogs:
        blogs.status === "fulfilled"
          ? blogs.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 3, total: 0, totalPages: 0 },
            },
      featuredProjects:
        projects.status === "fulfilled"
          ? projects.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 4, total: 0, totalPages: 0 },
            },
      categories:
        categories.status === "fulfilled"
          ? categories.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
            },
    };
  } catch (error) {
    console.error("Failed to load homepage data:", error);
    // Return empty data structure instead of throwing
    return {
      featuredBlogs: {
        data: [],
        pagination: { page: 1, pageSize: 3, total: 0, totalPages: 0 },
      },
      featuredProjects: {
        data: [],
        pagination: { page: 1, pageSize: 4, total: 0, totalPages: 0 },
      },
      categories: {
        data: [],
        pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      },
    };
  }
});

export default component$(() => {
  const homepageData = useHomepageDataLoader();
  const projectsStaggerRef = useStaggerAnimation(200);
  const blogsStaggerRef = useStaggerAnimation(300);
  const { ref: contactRef } = useScrollAnimation();

  const { featuredBlogs, featuredProjects, categories } = homepageData.value;

  return (
    <>
      <Hero />

      {/* Featured Projects Section */}
      <section id="projects" class="bg-base-200 py-20 pt-32">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Featured Projects
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
          </div>

          <div
            ref={projectsStaggerRef}
            class="stagger-container grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          >
            {featuredProjects.data.length > 0 ? (
              featuredProjects.data.map((project, index) => (
                <div
                  key={project.id}
                  class="card bg-base-100 hover-lift hover-glow shadow-xl"
                >
                  {/* No image field in schema, use gradient background */}
                  <figure class="from-primary to-secondary bg-gradient-to-br">
                    <div class="flex h-48 w-full items-center justify-center">
                      <svg
                        class="text-base-100 h-24 w-24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                  </figure>
                  <div class="card-body">
                    <h3 class="card-title">
                      {project.title}
                      {index === 0 && (
                        <div class="badge badge-secondary">Featured</div>
                      )}
                    </h3>
                    <p class="text-sm text-base-content/70">
                      {project.description || "No description available"}
                    </p>
                    {/* Technologies not available in current schema */}
                    <div class="mt-4 flex flex-wrap gap-2">
                      <div class="badge badge-outline">Technology</div>
                      <div class="badge badge-outline">Stack</div>
                    </div>
                    <div class="card-actions mt-4 justify-end">
                      {/* URLs not available in current schema - show placeholder */}
                      <button
                        class="btn btn-primary btn-sm hover-scale"
                        disabled
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback static projects when GraphQL data is not available
              <>
                {/* Static Project 1 - Reparin */}
                <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
                  <figure class="from-primary to-secondary bg-gradient-to-br">
                    <div class="flex h-48 w-full items-center justify-center">
                      <svg
                        class="text-base-100 h-24 w-24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                  </figure>
                  <div class="card-body">
                    <h3 class="card-title">
                      Reparin
                      <div class="badge badge-secondary">Featured</div>
                    </h3>
                    <p>
                      Platform layanan perbaikan gadget dengan teknologi modern.
                      Menghubungkan teknisi terpercaya dengan pelanggan.
                    </p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <div class="badge badge-outline">Next.js 14</div>
                      <div class="badge badge-outline">Golang</div>
                      <div class="badge badge-outline">shadcn/ui</div>
                      <div class="badge badge-outline">Bun</div>
                    </div>
                    <div class="card-actions mt-4 justify-end">
                      <Link
                        href="https://reparin.my.id"
                        target="_blank"
                        class="btn btn-primary btn-sm hover-scale"
                      >
                        Live Demo
                      </Link>
                      <button class="btn btn-ghost btn-sm">
                        <svg
                          class="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </button>
                    </div>
                  </div>
                </div>

                {/* Static Project 2 - URL Shortener */}
                <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
                  <figure class="from-accent to-info bg-gradient-to-br">
                    <div class="flex h-48 w-full items-center justify-center">
                      <svg
                        class="text-base-100 h-24 w-24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                  </figure>
                  <div class="card-body">
                    <h3 class="card-title">
                      URL Shortener
                      <div class="badge badge-primary">New</div>
                    </h3>
                    <p>
                      Aplikasi pemendek URL yang cepat dan efisien dengan
                      analytics dashboard untuk tracking link performance.
                    </p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <div class="badge badge-outline">Deno</div>
                      <div class="badge badge-outline">Fresh</div>
                      <div class="badge badge-outline">TypeScript</div>
                      <div class="badge badge-outline">Deno KV</div>
                    </div>
                    <div class="card-actions mt-4 justify-end">
                      <Link
                        href="https://mil.kamil.my.id"
                        target="_blank"
                        class="btn btn-primary btn-sm hover-scale"
                      >
                        Live Demo
                      </Link>
                      <button class="btn btn-ghost btn-sm">
                        <svg
                          class="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div class="mt-12 text-center">
            <Link href="/projects" class="btn btn-outline btn-lg hover-scale">
              View All Projects
              <svg
                class="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section id="blog" class="py-20">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Latest Blog Posts
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
          </div>

          <div
            ref={blogsStaggerRef}
            class="stagger-container grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredBlogs.data.length > 0 ? (
              featuredBlogs.data.map((blog) => (
                <article
                  key={blog.id}
                  class="card bg-base-100 hover-lift hover-glow shadow-xl"
                >
                  {/* Featured image not available in current schema */}
                  <div class="card-body">
                    <h3 class="card-title text-lg">
                      <Link
                        href={`/blog/${blog.slug}`}
                        class="hover:text-primary transition-colors"
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <p class="text-sm text-base-content/70 line-clamp-3">
                      {blog.summary || "No summary available"}
                    </p>
                    <div class="mt-4 flex items-center justify-between">
                      <div class="text-xs text-base-content/60">
                        {blog.publishedAt &&
                          new Date(blog.publishedAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                      </div>
                      {/* Read time not available in current schema */}
                      <div class="badge badge-ghost badge-sm">
                        {Math.ceil((blog.content?.length || 0) / 1000)} min read
                      </div>
                    </div>
                    <div class="card-actions mt-4 justify-end">
                      <Link
                        href={`/blog/${blog.slug}`}
                        class="btn btn-primary btn-sm hover-scale"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              // Fallback message when no blogs are available
              <div class="col-span-full text-center py-12">
                <h3 class="text-2xl font-semibold mb-4 text-base-content/70">
                  Blog posts coming soon!
                </h3>
                <p class="text-base-content/60">
                  I'm working on creating amazing content for you. Stay tuned!
                </p>
              </div>
            )}
          </div>

          {featuredBlogs.data.length > 0 && (
            <div class="mt-12 text-center">
              <Link href="/blog" class="btn btn-outline btn-lg hover-scale">
                View All Posts
                <svg
                  class="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories/Skills Section */}
      {categories.data.length > 0 && (
        <section id="skills" class="bg-base-200 py-20">
          <div class="container mx-auto px-4">
            <div class="animate-fadeInDown mb-12 text-center">
              <h2 class="animate-textReveal mb-4 text-4xl font-bold">
                Skills & Expertise
              </h2>
              <div
                class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
                style="animation-delay: 0.3s"
              ></div>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.data.map((category) => (
                <div
                  key={category.id}
                  class="card bg-base-100 hover-lift shadow-lg"
                >
                  <div class="card-body p-6 text-center">
                    <h3 class="card-title justify-center text-lg">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p class="text-sm text-base-content/70 mt-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" ref={contactRef} class="animate-fadeInUp py-20">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Get In Touch
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
            <p class="mt-4 text-lg text-base-content/70">
              Have a project in mind? Let's work together!
            </p>
          </div>

          <div class="mx-auto max-w-4xl">
            <div class="grid gap-8 md:grid-cols-2">
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div class="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <svg
                      class="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">Email</h3>
                    <p class="text-base-content/70">hisyam@kamil.my.id</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <svg
                      class="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">GitHub</h3>
                    <Link
                      href="https://github.com/hisyam99"
                      target="_blank"
                      class="text-primary hover:underline"
                    >
                      github.com/hisyam99
                    </Link>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <svg
                      class="h-6 w-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">LinkedIn</h3>
                    <Link
                      href="https://linkedin.com/in/hisyam99"
                      target="_blank"
                      class="text-primary hover:underline"
                    >
                      linkedin.com/in/hisyam99
                    </Link>
                  </div>
                </div>
              </div>

              <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                  <h3 class="card-title mb-4">Send a Message</h3>
                  <form class="space-y-4">
                    <div class="form-control">
                      <label class="label" for="name">
                        <span class="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        class="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div class="form-control">
                      <label class="label" for="email">
                        <span class="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your.email@example.com"
                        class="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div class="form-control">
                      <label class="label" for="message">
                        <span class="label-text">Message</span>
                      </label>
                      <textarea
                        id="message"
                        class="textarea textarea-bordered h-24"
                        placeholder="Your message here..."
                        required
                      ></textarea>
                    </div>
                    <div class="card-actions justify-end">
                      <button type="submit" class="btn btn-primary hover-scale">
                        Send Message
                        <svg
                          class="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hisyam Kamil - Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Next.js, Node.js, and more.",
    },
    {
      name: "keywords",
      content:
        "Full Stack Developer, React, Next.js, Node.js, TypeScript, JavaScript, Web Development, Hisyam Kamil",
    },
    {
      property: "og:title",
      content: "Hisyam Kamil - Full Stack Developer",
    },
    {
      property: "og:description",
      content:
        "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Next.js, Node.js, and more.",
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
      name: "twitter:title",
      content: "Hisyam Kamil - Full Stack Developer",
    },
    {
      name: "twitter:description",
      content:
        "Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Next.js, Node.js, and more.",
    },
  ],
};
