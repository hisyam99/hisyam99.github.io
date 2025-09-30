import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { getPublishedBlogs } from "~/services/blog";

/**
 * Blog listing page loader
 * Loads published blogs with pagination
 */
export const useBlogListLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSize = parseInt(url.searchParams.get('pageSize') || '12', 10)
  const sortBy = url.searchParams.get('sortBy') || 'publishedAt'
  const sortDirection = (url.searchParams.get('sortDirection') || 'DESC') as 'ASC' | 'DESC'

  try {
    return await getPublishedBlogs({
      page,
      pageSize,
      sortBy,
      sortDirection,
    })
  } catch (error) {
    console.error('Failed to load blogs:', error)
    return {
      data: [],
      pagination: { page: 1, pageSize: 12, total: 0, totalPages: 0 }
    }
  }
})

export default component$(() => {
  const blogData = useBlogListLoader()
  const { data: blogs, pagination } = blogData.value

  return (
    <>
      {/* Header */}
      <section class="bg-base-200 py-20 pt-32">
        <div class="container mx-auto px-4">
          <div class="text-center">
            <h1 class="animate-textReveal mb-4 text-5xl font-bold">
              Blog
            </h1>
            <div class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"></div>
            <p class="mt-6 text-xl text-base-content/70 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, 
              technology, and programming best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section class="py-20">
        <div class="container mx-auto px-4">
          {blogs.length > 0 ? (
            <>
              <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <article key={blog.id} class="card bg-base-100 hover-lift hover-glow shadow-xl">
                    {/* Blog content placeholder since featuredImage not in schema */}
                    <figure class="from-primary to-secondary bg-gradient-to-br">
                      <div class="flex h-48 w-full items-center justify-center">
                        <svg
                          class="text-base-100 h-16 w-16"
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
                      </div>
                    </figure>

                    <div class="card-body">
                      <h2 class="card-title text-xl">
                        <Link 
                          href={`/blog/${blog.slug}`}
                          class="hover:text-primary transition-colors"
                        >
                          {blog.title}
                        </Link>
                      </h2>
                      
                      <p class="text-base-content/70 line-clamp-3">
                        {blog.summary || 'No summary available'}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div class="flex flex-wrap gap-2 mt-4">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <div key={tag} class="badge badge-outline badge-sm">
                              {tag}
                            </div>
                          ))}
                          {blog.tags.length > 3 && (
                            <div class="badge badge-ghost badge-sm">
                              +{blog.tags.length - 3} more
                            </div>
                          )}
                        </div>
                      )}

                      {/* Meta information */}
                      <div class="mt-4 flex items-center justify-between text-sm text-base-content/60">
                        <div class="flex items-center space-x-4">
                          {blog.author && (
                            <span>By {blog.author}</span>
                          )}
                          {blog.publishedAt && (
                            <time>
                              {new Date(blog.publishedAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>
                          )}
                        </div>
                        <div class="badge badge-ghost badge-sm">
                          {Math.ceil((blog.content?.length || 0) / 1000)} min read
                        </div>
                      </div>

                      <div class="card-actions mt-6 justify-end">
                        <Link
                          href={`/blog/${blog.slug}`}
                          class="btn btn-primary btn-sm hover-scale"
                        >
                          Read More
                          <svg
                            class="ml-1 h-4 w-4"
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
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div class="mt-12 text-center">
                  <div class="join">
                    {pagination.page > 1 && (
                      <Link
                        href={`/blog?page=${pagination.page - 1}`}
                        class="join-item btn btn-outline"
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Previous
                      </Link>
                    )}
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, pagination.page - 2) + i
                      if (pageNum > pagination.totalPages) return null
                      
                      return (
                        <Link
                          key={pageNum}
                          href={`/blog?page=${pageNum}`}
                          class={`join-item btn ${pageNum === pagination.page ? 'btn-active' : 'btn-outline'}`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}

                    {pagination.page < pagination.totalPages && (
                      <Link
                        href={`/blog?page=${pagination.page + 1}`}
                        class="join-item btn btn-outline"
                      >
                        Next
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                  
                  <p class="mt-4 text-sm text-base-content/60">
                    Showing page {pagination.page} of {pagination.totalPages} 
                    ({pagination.total} total posts)
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div class="text-center py-20">
              <div class="text-6xl mb-6">📝</div>
              <h2 class="text-3xl font-bold mb-4 text-base-content/70">
                No blog posts yet
              </h2>
              <p class="text-lg text-base-content/60 mb-8 max-w-md mx-auto">
                I'm working on creating amazing content for you. 
                Check back soon for new posts!
              </p>
              <Link href="/" class="btn btn-primary">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Newsletter Section */}
      <section class="bg-base-200 py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
            <p class="text-base-content/70 mb-8">
              Get notified when I publish new articles about web development and technology.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                class="input input-bordered flex-1"
              />
              <button class="btn btn-primary">
                Subscribe
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
          </div>
        </div>
      </section>
    </>
  )
})

export const head: DocumentHead = {
  title: "Blog - Hisyam Kamil",
  meta: [
    {
      name: "description",
      content: "Read the latest articles about web development, programming tutorials, and technology insights by Hisyam Kamil.",
    },
    {
      name: "keywords",
      content: "Blog, Web Development, Programming, Tutorials, React, Next.js, Node.js, TypeScript, JavaScript",
    },
    {
      property: "og:title",
      content: "Blog - Hisyam Kamil",
    },
    {
      property: "og:description",
      content: "Read the latest articles about web development, programming tutorials, and technology insights.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ]
}