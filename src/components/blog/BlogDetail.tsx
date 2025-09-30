import { component$, useStore, useTask$ } from '@builder.io/qwik';
import type { Blog } from '~/types/graphql';
import { createQueryExecutor, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { GET_BLOG_BY_SLUG_QUERY } from '~/graphql/queries';

interface BlogDetailProps {
  slug: string;
}

export const BlogDetail = component$<BlogDetailProps>(({ slug }) => {
  const { setLoading, isLoading } = useLoadingState();
  const { setError, getError } = useErrorHandler();

  const blogState = useStore<{
    blog: Blog | null;
  }>({
    blog: null,
  });

  const executeQuery = createQueryExecutor<{ blogBySlug: Blog }>(GET_BLOG_BY_SLUG_QUERY);

  // Fetch blog by slug
  useTask$(({ track }) => {
    track(() => slug);
    
    const fetchBlog = async () => {
      if (!slug) return;
      
      setLoading('blog', true);
      setError('blog', undefined);

      try {
        const result = await executeQuery({ slug });
        
        if (result?.blogBySlug) {
          blogState.blog = result.blogBySlug;
        } else {
          setError('blog', 'Blog not found');
        }
      } catch (error) {
        setError('blog', error instanceof Error ? error.message : 'Failed to load blog');
      } finally {
        setLoading('blog', false);
      }
    };

    fetchBlog();
  });

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading State
  if (isLoading('blog')) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-center items-center min-h-64">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  // Error State
  if (getError('blog')) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>{getError('blog')}</span>
        </div>
        <div class="mt-8 text-center">
          <a href="/blog" class="btn btn-primary">
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  // Blog not found
  if (!blogState.blog) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="text-center py-16">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-2xl font-bold mb-2">Blog not found</h3>
          <p class="text-base-content/70 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <a href="/blog" class="btn btn-primary">
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  const blog = blogState.blog;

  return (
    <div class="min-h-screen bg-base-200">
      <div class="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div class="breadcrumbs text-sm mb-8">
          <ul>
            <li><a href="/" class="hover:text-primary">Home</a></li>
            <li><a href="/blog" class="hover:text-primary">Blog</a></li>
            <li class="text-base-content/60">{blog.title}</li>
          </ul>
        </div>

        {/* Article */}
        <article class="bg-base-100 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <header class="bg-gradient-to-r from-primary to-secondary text-primary-content p-8">
            <div class="max-w-4xl mx-auto">
              {/* Tags */}
              {blog.tags.length > 0 && (
                <div class="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} class="badge badge-accent badge-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>

              {/* Summary */}
              {blog.summary && (
                <p class="text-xl opacity-90 mb-6 leading-relaxed">
                  {blog.summary}
                </p>
              )}

              {/* Meta */}
              <div class="flex flex-wrap items-center gap-4 text-sm opacity-80">
                {blog.author && (
                  <div class="flex items-center gap-2">
                    <span class="inline-block w-2 h-2 bg-current rounded-full"></span>
                    By {blog.author}
                  </div>
                )}
                
                {blog.publishedAt && (
                  <div class="flex items-center gap-2">
                    <span class="inline-block w-2 h-2 bg-current rounded-full"></span>
                    {formatDate(blog.publishedAt)}
                  </div>
                )}

                <div class="flex items-center gap-2">
                  <span class="inline-block w-2 h-2 bg-current rounded-full"></span>
                  <span class="badge badge-outline border-current">
                    {blog.status.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div class="max-w-4xl mx-auto p-8">
            <div 
              class="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={blog.content}
            />
          </div>

          {/* Footer */}
          <footer class="border-t bg-base-50 p-8">
            <div class="max-w-4xl mx-auto">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="text-sm text-base-content/60">
                  Last updated: {formatDate(blog.updatedAt)}
                </div>
                
                <div class="flex gap-2">
                  <button class="btn btn-outline btn-sm">
                    Share
                  </button>
                  <button class="btn btn-outline btn-sm">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Navigation */}
        <div class="mt-12 flex justify-center">
          <a href="/blog" class="btn btn-primary btn-lg">
            ← Back to Blog List
          </a>
        </div>

        {/* Related Posts Section - Placeholder */}
        <section class="mt-16">
          <h2 class="text-2xl font-bold mb-8 text-center">Related Posts</h2>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center py-12">
              <p class="text-base-content/60">
                Related posts feature coming soon!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});