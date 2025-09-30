import { component$, useStore, useTask$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { Blog, BlogStatus } from '~/types/graphql';
import { createMutationExecutor, createQueryExecutor, useLoadingState, useErrorHandler } from '~/hooks/useGraphQL';
import { CREATE_BLOG_MUTATION, UPDATE_BLOG_MUTATION } from '~/graphql/mutations';
import { GET_BLOG_QUERY } from '~/graphql/queries';

interface BlogFormData {
  title: string;
  content: string;
  summary: string;
  status: BlogStatus;
  tags: string[];
  author: string;
  slug: string;
}

interface BlogEditorProps {
  blogId?: string;
}

export const BlogEditor = component$<BlogEditorProps>(({ blogId }) => {
  const navigate = useNavigate();
  const { setLoading, isLoading } = useLoadingState();
  const { setError, getError } = useErrorHandler();

  const blogState = useStore<{
    blog: BlogFormData;
    isDirty: boolean;
  }>({
    blog: {
      title: '',
      content: '',
      summary: '',
      status: 'DRAFT' as BlogStatus,
      tags: [],
      author: '',
      slug: '',
    },
    isDirty: false,
  });

  const createBlogMutation = createMutationExecutor<{ createBlog: Blog }>(CREATE_BLOG_MUTATION);
  const updateBlogMutation = createMutationExecutor<{ updateBlog: Blog }>(UPDATE_BLOG_MUTATION);
  const getBlogQuery = createQueryExecutor<{ blog: Blog }>(GET_BLOG_QUERY);

  // Load existing blog if editing
  useTask$(({ track }) => {
    track(() => blogId);
    
    const loadBlog = async () => {
      if (!blogId) return;
      
      setLoading('blog', true);
      setError('blog', undefined);

      try {
        const result = await getBlogQuery({ id: blogId });
        
        if (result?.blog) {
          const blog = result.blog;
          blogState.blog = {
            title: blog.title,
            content: blog.content,
            summary: blog.summary || '',
            status: blog.status,
            tags: blog.tags,
            author: blog.author || '',
            slug: blog.slug,
          };
        } else {
          setError('blog', 'Blog not found');
        }
      } catch (error) {
        setError('blog', error instanceof Error ? error.message : 'Failed to load blog');
      } finally {
        setLoading('blog', false);
      }
    };

    loadBlog();
  });

  // Generate slug from title
  const generateSlug = $((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  // Form handlers
  const handleInputChange = $(async (field: keyof BlogFormData, value: string) => {
    if (field === 'title') {
      blogState.blog.title = value;
      // Auto-generate slug from title if creating new blog
      if (!blogId) {
        blogState.blog.slug = await generateSlug(value);
      }
    } else if (field === 'content') {
      blogState.blog.content = value;
    } else if (field === 'summary') {
      blogState.blog.summary = value;
    } else if (field === 'author') {
      blogState.blog.author = value;
    } else if (field === 'slug') {
      blogState.blog.slug = value;
    } else if (field === 'status') {
      blogState.blog.status = value as BlogStatus;
    }
    blogState.isDirty = true;
  });

  const handleTagsChange = $((tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    blogState.blog.tags = tags;
    blogState.isDirty = true;
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    
    setLoading('save', true);
    setError('save', undefined);

    try {
      let result;
      
      if (blogId) {
        // Update existing blog
        const updateInput = {
          title: blogState.blog.title,
          content: blogState.blog.content,
          summary: blogState.blog.summary,
          status: blogState.blog.status,
          tags: blogState.blog.tags,
          author: blogState.blog.author,
          slug: blogState.blog.slug,
        };
        
        result = await updateBlogMutation({ 
          id: blogId, 
          input: updateInput
        });
        
        if (result?.updateBlog) {
          await navigate(`/blog/${result.updateBlog.slug}`);
        }
      } else {
        // Create new blog
        const createInput = {
          title: blogState.blog.title,
          content: blogState.blog.content,
          summary: blogState.blog.summary,
          slug: blogState.blog.slug,
          status: blogState.blog.status,
          tags: blogState.blog.tags,
          author: blogState.blog.author,
        };
        
        result = await createBlogMutation({ 
          input: createInput
        });
        
        if (result?.createBlog) {
          await navigate(`/blog/${result.createBlog.slug}`);
        }
      }
      
      blogState.isDirty = false;
    } catch (error) {
      setError('save', error instanceof Error ? error.message : 'Failed to save blog');
    } finally {
      setLoading('save', false);
    }
  });

  const handleCancel = $(async () => {
    if (blogState.isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        await navigate('/blog');
      }
    } else {
      await navigate('/blog');
    }
  });

  // Loading state for initial load
  if (blogId && isLoading('blog')) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-center items-center min-h-64">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  // Error state for initial load
  if (getError('blog')) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>{getError('blog')}</span>
        </div>
        <div class="mt-8 text-center">
          <button onClick$={handleCancel} class="btn btn-outline">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-base-200">
      <div class="container mx-auto px-4 py-8">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">
            {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <div class="breadcrumbs text-sm">
            <ul>
              <li><a href="/" class="hover:text-primary">Home</a></li>
              <li><a href="/blog" class="hover:text-primary">Blog</a></li>
              <li class="text-base-content/60">
                {blogId ? 'Edit' : 'Create'}
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div class="bg-base-100 rounded-lg shadow-xl p-6">
          <form onSubmit$={handleSubmit} class="space-y-6">
            {/* Title */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Title *</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                value={blogState.blog.title}
                onInput$={(e) => handleInputChange('title', (e.target as HTMLInputElement).value)}
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* Author */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Author</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                value={blogState.blog.author}
                onInput$={(e) => handleInputChange('author', (e.target as HTMLInputElement).value)}
                placeholder="Enter author name..."
              />
            </div>

            {/* Summary */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Summary</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-24"
                value={blogState.blog.summary}
                onInput$={(e) => handleInputChange('summary', (e.target as HTMLTextAreaElement).value)}
                placeholder="Brief summary of the blog post..."
              />
            </div>

            {/* Content */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Content *</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-96"
                value={blogState.blog.content}
                onInput$={(e) => handleInputChange('content', (e.target as HTMLTextAreaElement).value)}
                placeholder="Write your blog content here... (HTML is supported)"
                required
              />
              <label class="label">
                <span class="label-text-alt">HTML tags are supported</span>
              </label>
            </div>

            {/* Tags */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Tags</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                value={blogState.blog.tags.join(', ')}
                onInput$={(e) => handleTagsChange((e.target as HTMLInputElement).value)}
                placeholder="tag1, tag2, tag3..."
              />
              <label class="label">
                <span class="label-text-alt">Separate tags with commas</span>
              </label>
            </div>

            {/* Status */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Status</span>
              </label>
              <select
                class="select select-bordered w-full"
                value={blogState.blog.status}
                onChange$={(e) => handleInputChange('status', (e.target as HTMLSelectElement).value)}
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Error Display */}
            {getError('save') && (
              <div class="alert alert-error">
                <span>{getError('save')}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div class="flex flex-wrap gap-4 pt-6">
              <button
                type="submit"
                class={`btn btn-primary ${isLoading('save') ? 'loading' : ''}`}
                disabled={isLoading('save') || !blogState.blog.title || !blogState.blog.content}
              >
                {isLoading('save') ? 'Saving...' : (blogId ? 'Update Blog' : 'Create Blog')}
              </button>
              
              <button
                type="button"
                class="btn btn-outline"
                onClick$={handleCancel}
                disabled={isLoading('save')}
              >
                Cancel
              </button>

              {blogState.isDirty && (
                <div class="badge badge-warning">Unsaved changes</div>
              )}
            </div>
          </form>
        </div>

        {/* Preview Section - Could be expanded */}
        {blogState.blog.content && (
          <div class="mt-8 bg-base-100 rounded-lg shadow-xl p-6">
            <h2 class="text-xl font-bold mb-4">Content Preview</h2>
            <div class="border rounded-lg p-4 bg-base-50">
              <div 
                class="prose max-w-none"
                dangerouslySetInnerHTML={blogState.blog.content}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});