import { component$, useStore, useTask$, useSignal } from '@builder.io/qwik';
import type { Blog, BlogConnection, SortDirection } from '~/types/graphql';
import { createQueryExecutor, usePagination, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { GET_PUBLISHED_BLOGS_QUERY } from '~/graphql/queries';

export const PublicBlogList = component$(() => {
  const { variables, setPage, setPageSize, setSorting } = usePagination({
    page: 1,
    pageSize: 12,
    sortBy: 'publishedAt',
    sortDirection: 'DESC' as SortDirection,
  });
  
  const searchTerm = useSignal('');
  const { setLoading, isLoading } = useLoadingState();
  const { setError, getError } = useErrorHandler();

  const blogState = useStore<{
    blogs: Blog[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    } | null;
  }>({
    blogs: [],
    pagination: null,
  });

  const executeQuery = createQueryExecutor<BlogConnection>(GET_PUBLISHED_BLOGS_QUERY);

  // Fetch blogs
  useTask$(({ track }) => {
    track(() => variables);
    
    const fetchBlogs = async () => {
      setLoading('blogs', true);
      setError('blogs', undefined);

      try {
        const result = await executeQuery(variables);
        
        if (result) {
          blogState.blogs = result.data;
          blogState.pagination = result.pagination;
        }
      } catch (error) {
        setError('blogs', error instanceof Error ? error.message : 'Failed to load blogs');
      } finally {
        setLoading('blogs', false);
      }
    };

    fetchBlogs();
  });

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate text helper
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div class="container mx-auto px-4 py-8">
      {/* Header */}
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold mb-4">Blog</h1>
        <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
          Thoughts, insights, and experiences from my journey in technology and development.
        </p>
      </div>

      {/* Search Bar */}
      <div class="mb-8 flex justify-center">
        <div class="join max-w-md w-full">
          <input
            type="text"
            class="input input-bordered join-item flex-1"
            placeholder="Search articles..."
            value={searchTerm.value}
            onInput$={(e) => searchTerm.value = (e.target as HTMLInputElement).value}
          />
          <button class="btn btn-primary join-item">
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading('blogs') && (
        <div class="flex justify-center items-center min-h-64">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      )}

      {/* Error State */}
      {getError('blogs') && (
        <div class="alert alert-error mb-8">
          <span>{getError('blogs')}</span>
        </div>
      )}

      {/* Sort Controls */}
      {!isLoading('blogs') && blogState.blogs.length > 0 && (
        <div class="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Sort by:</span>
            <div class="join">
              <button
                class={`btn btn-sm join-item ${variables.sortBy === 'publishedAt' ? 'btn-active' : 'btn-outline'}`}
                onClick$={() => setSorting('publishedAt')}
              >
                Date
              </button>
              <button
                class={`btn btn-sm join-item ${variables.sortBy === 'title' ? 'btn-active' : 'btn-outline'}`}
                onClick$={() => setSorting('title')}
              >
                Title
              </button>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium">Per page:</span>
            <select
              class="select select-bordered select-sm"
              value={variables.pageSize}
              onChange$={(e) => setPageSize(parseInt((e.target as HTMLSelectElement).value))}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      )}

      {/* Blog Grid - Public View (No Admin Actions) */}
      {!isLoading('blogs') && !getError('blogs') && blogState.blogs.length > 0 && (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogState.blogs.map((blog) => (
            <article key={blog.id} class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div class="card-body">
                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div class="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} class="badge badge-primary badge-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2 class="card-title text-lg mb-3 line-clamp-2">
                  <a href={`/blog/${blog.slug}`} class="hover:text-primary transition-colors">
                    {blog.title}
                  </a>
                </h2>
                
                {blog.summary && (
                  <p class="text-base-content/70 text-sm mb-4 line-clamp-3">
                    {truncateText(blog.summary, 150)}
                  </p>
                )}
                
                <div class="flex items-center justify-between text-xs text-base-content/60 mb-3">
                  <div class="flex items-center gap-2">
                    {blog.author && (
                      <span>By {blog.author}</span>
                    )}
                    {blog.publishedAt && (
                      <span>• {formatDate(blog.publishedAt)}</span>
                    )}
                  </div>
                </div>

                <div class="card-actions justify-end">
                  <a
                    href={`/blog/${blog.slug}`}
                    class="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading('blogs') && !getError('blogs') && blogState.blogs.length === 0 && (
        <div class="text-center py-16">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-2xl font-bold mb-2">No blogs yet</h3>
          <p class="text-base-content/70">
            Check back later for new content!
          </p>
        </div>
      )}

      {/* Pagination */}
      {blogState.pagination && blogState.pagination.totalPages > 1 && (
        <div class="flex justify-center">
          <div class="join">
            <button
              class="join-item btn"
              disabled={blogState.pagination.page <= 1}
              onClick$={() => setPage(blogState.pagination!.page - 1)}
            >
              Previous
            </button>
            
            {Array.from({ length: blogState.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                class={`join-item btn ${pageNum === blogState.pagination!.page ? 'btn-active' : ''}`}
                onClick$={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              class="join-item btn"
              disabled={blogState.pagination.page >= blogState.pagination.totalPages}
              onClick$={() => setPage(blogState.pagination!.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
});