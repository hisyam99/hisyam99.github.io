import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { getBlogBySlug } from "~/services/blog";

/**
 * Blog detail page loader
 * Loads a single blog post by slug
 * This runs on every request (SSR) to ensure fresh data
 */
// eslint-disable-next-line qwik/loader-location
export const useBlogDetailLoader = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;

  if (!slug) {
    throw new Error("Blog slug is required");
  }

  console.log(`🔄 Fetching fresh blog data for slug: ${slug}`);

  try {
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      console.log(`❌ Blog not found for slug: ${slug}`);
      requestEvent.status(404);
      throw new Error("Blog not found");
    }

    console.log(`✅ Loaded blog: ${blog.title}`);
    return blog;
  } catch (error) {
    console.error("❌ Failed to load blog by slug:", error);
    throw error;
  }
});

export default component$(() => {
  const blogData = useBlogDetailLoader();
  const blog = blogData.value;

  return (
    <>
      {/* Hero Section */}
      <section class="bg-base-200 py-20 pt-32">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav class="mb-8">
              <div class="breadcrumbs text-sm">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li class="text-base-content/60">{blog.title}</li>
                </ul>
              </div>
            </nav>

            {/* Article Header */}
            <header class="text-center">
              <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div class="flex flex-wrap items-center justify-center gap-4 text-base-content/60 mb-8">
                {blog.author && (
                  <div class="flex items-center gap-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>By {blog.author}</span>
                  </div>
                )}

                {blog.publishedAt && (
                  <div class="flex items-center gap-2">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time>
                      {new Date(blog.publishedAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                )}

                <div class="flex items-center gap-2">
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
                    />
                  </svg>
                  <span>
                    {Math.ceil((blog.content?.length || 0) / 1000)} min read
                  </span>
                </div>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div class="flex flex-wrap justify-center gap-2 mb-8">
                  {blog.tags.map((tag) => (
                    <div key={tag} class="badge badge-outline">
                      {tag}
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {blog.summary && (
                <div class="bg-base-100 rounded-lg p-6 max-w-2xl mx-auto">
                  <p class="text-lg text-base-content/80 italic">
                    {blog.summary}
                  </p>
                </div>
              )}
            </header>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <article class="prose prose-lg max-w-none">
              {/* Note: In a real application, you'd want to parse markdown or HTML content */}
              <div class="bg-base-100 rounded-lg p-8 shadow-lg">
                <div class="whitespace-pre-wrap text-base-content leading-relaxed">
                  {blog.content}
                </div>
              </div>
            </article>

            {/* Article Footer */}
            <footer class="mt-12 pt-8 border-t border-base-300">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                {/* Share Section */}
                <div>
                  <h3 class="text-lg font-semibold mb-3">Share this article</h3>
                  <div class="flex gap-3">
                    <button class="btn btn-circle btn-outline btn-sm">
                      <svg
                        class="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                    <button class="btn btn-circle btn-outline btn-sm">
                      <svg
                        class="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                    <button class="btn btn-circle btn-outline btn-sm">
                      <svg
                        class="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Author Info */}
                {blog.author && (
                  <div class="bg-base-100 rounded-lg p-4 max-w-sm">
                    <div class="flex items-center gap-3">
                      <div class="avatar placeholder">
                        <div class="bg-primary text-primary-content rounded-full w-12">
                          <span class="text-xl">
                            {blog.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 class="font-semibold">{blog.author}</h4>
                        <p class="text-sm text-base-content/60">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section class="bg-base-200 py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12">
              Continue Reading
            </h2>

            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/blog" class="btn btn-outline btn-lg">
                <svg
                  class="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                All Blog Posts
              </Link>

              <Link href="/" class="btn btn-primary btn-lg">
                Back to Home
                <svg
                  class="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const blog = resolveValue(useBlogDetailLoader);

  return {
    title: `${blog.title} - Hisyam Kamil`,
    meta: [
      {
        name: "description",
        content:
          blog.summary ||
          blog.metaDescription ||
          `Read "${blog.title}" - A blog post by Hisyam Kamil about web development and technology.`,
      },
      {
        name: "keywords",
        content: blog.tags
          ? blog.tags.join(", ")
          : "Blog, Web Development, Programming, Tutorial",
      },
      {
        property: "og:title",
        content: blog.title,
      },
      {
        property: "og:description",
        content:
          blog.summary ||
          blog.metaDescription ||
          `Read "${blog.title}" - A blog post by Hisyam Kamil.`,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "article:author",
        content: blog.author || "Hisyam Kamil",
      },
      {
        property: "article:published_time",
        content: blog.publishedAt || blog.createdAt,
      },
      {
        property: "article:tag",
        content: blog.tags ? blog.tags.join(",") : "",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: blog.title,
      },
      {
        name: "twitter:description",
        content:
          blog.summary ||
          blog.metaDescription ||
          `Read "${blog.title}" - A blog post by Hisyam Kamil.`,
      },
    ],
  };
};
