import { component$, useStore, useTask$ } from '@builder.io/qwik';
import type { Blog, BlogConnection, SortDirection } from '~/types/graphql';
import { createQueryExecutor, usePagination, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { GET_PUBLISHED_BLOGS_QUERY } from '~/graphql/queries';

export const BlogList = component$(() => {
  const { variables, setPage, setPageSize, setSorting } = usePagination({
    page: 1,
    pageSize: 12,
    sortBy: 'publishedAt',
    sortDirection: 'DESC' as SortDirection,
  });
  
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
      <div class="mb-12">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-4">Blog</h1>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            Thoughts, insights, and experiences from my journey in technology and development.
          </p>
        </div>
        
        {/* Action Bar */}
        <div class="flex justify-center">
          <a href="/blog/create" class="btn btn-primary">
            <span class="text-lg mr-2">+</span>
            Create New Post
          </a>
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
              onChange$={(event) => {
                setPageSize(parseInt((event.target as HTMLSelectElement).value));
              }}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      {!isLoading('blogs') && blogState.blogs.length > 0 && (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogState.blogs.map((blog) => (
            <article key={blog.id} class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div class="card-body">
                <div class="flex flex-wrap gap-2 mb-3">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} class="badge badge-primary badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
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
                  
                  <div class="badge badge-outline badge-sm">
                    {blog.status.toLowerCase()}
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <a
                    href={`/blog/${blog.slug}`}
                    class="btn btn-primary btn-sm"
                  >
                    Read More
                  </a>
                  
                  {/* Admin Actions */}
                  <div class="dropdown dropdown-end">
                    <div tabIndex={0} role="button" class="btn btn-ghost btn-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                      </svg>
                    </div>
                    <ul tabIndex={0} class="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                      <li><a href={`/blog/edit/${blog.id}`}>Edit</a></li>
                      <li><button class="text-error w-full text-left" onClick$={() => {
                        if (confirm('Are you sure you want to delete this blog post?')) {
                          // TODO: Implement delete functionality
                          console.log('Delete blog:', blog.id);
                        }
                      }}>Delete</button></li>
                    </ul>
                  </div>
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
              «
            </button>
            
            {Array.from({ length: Math.min(5, blogState.pagination.totalPages) }, (_, i) => {
              const page = Math.max(1, blogState.pagination!.page - 2) + i;
              if (page > blogState.pagination!.totalPages) return null;
              
              return (
                <button
                  key={page}
                  class={`join-item btn ${page === blogState.pagination!.page ? 'btn-active' : ''}`}
                  onClick$={() => setPage(page)}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              class="join-item btn"
              disabled={blogState.pagination.page >= blogState.pagination.totalPages}
              onClick$={() => setPage(blogState.pagination!.page + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
});