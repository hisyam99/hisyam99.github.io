import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import { routeLoader$, routeAction$, Form } from '@builder.io/qwik-city';
import { getAllBlogs, deleteBlog, bulkUpdateBlogStatus } from '~/services/admin-blog';
import type { Blog } from '~/services/admin-blog';

export const useBlogsData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get('accessToken')?.value;
  
  if (!token) {
    throw requestEvent.redirect(302, '/auth/login');
  }

  try {
    const result = await getAllBlogs(token);
    return { blogs: result.data, error: null };
  } catch (error) {
    console.error('Failed to load blogs:', error);
    return { blogs: [], error: 'Failed to load blogs' };
  }
});

export const useDeleteBlog = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get('accessToken')?.value;
  
  if (!token) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }

  try {
    const blogId = data.id as string;
    await deleteBlog(token, blogId);
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to delete blog:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete blog' 
    };
  }
});

export const useBulkAction = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get('accessToken')?.value;
  
  if (!token) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }

  try {
    const blogIds = JSON.parse(data.blogIds as string) as string[];
    const status = data.status as 'PUBLISHED' | 'DRAFT';
    
    await bulkUpdateBlogStatus(token, blogIds, status);
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to perform bulk action:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to perform bulk action' 
    };
  }
});

export default component$(() => {
  const blogsData = useBlogsData();
  const deleteAction = useDeleteBlog();
  const bulkAction = useBulkAction();
  
  const searchTerm = useSignal('');
  const statusFilter = useSignal('ALL');
  const selectedBlogs = useSignal<string[]>([]);
  const filteredBlogs = useSignal<Blog[]>([]);

  // Filter blogs based on search and status
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => statusFilter.value);
    track(() => blogsData.value.blogs);

    const blogs = blogsData.value.blogs;
    let filtered = blogs;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term) ||
        blog.summary?.toLowerCase().includes(term) ||
        blog.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (statusFilter.value !== 'ALL') {
      filtered = filtered.filter(blog => blog.status === statusFilter.value);
    }

    filteredBlogs.value = filtered;
  });

  const handleSelectAll = $(() => {
    if (selectedBlogs.value.length === filteredBlogs.value.length) {
      selectedBlogs.value = [];
    } else {
      selectedBlogs.value = filteredBlogs.value.map(blog => blog.id);
    }
  });

  const handleSelectBlog = $((blogId: string) => {
    if (selectedBlogs.value.includes(blogId)) {
      selectedBlogs.value = selectedBlogs.value.filter(id => id !== blogId);
    } else {
      selectedBlogs.value = [...selectedBlogs.value, blogId];
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Blog Management</h1>
        <a href="/admin/blogs/new" class="btn btn-primary">
          Create New Blog
        </a>
      </div>

      {/* Search and Filters */}
      <div class="bg-base-200 p-4 rounded-lg mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search blogs..."
              class="input input-bordered w-full"
              value={searchTerm.value}
              onInput$={(e) => {
                searchTerm.value = (e.target as HTMLInputElement).value;
              }}
            />
          </div>
          <select
            class="select select-bordered"
            value={statusFilter.value}
            onChange$={(e) => {
              statusFilter.value = (e.target as HTMLSelectElement).value;
            }}
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBlogs.value.length > 0 && (
        <div class="bg-warning bg-opacity-10 p-4 rounded-lg mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm">
              {selectedBlogs.value.length} blog(s) selected
            </span>
            <div class="flex gap-2">
              <Form action={bulkAction}>
                <input type="hidden" name="blogIds" value={JSON.stringify(selectedBlogs.value)} />
                <input type="hidden" name="status" value="PUBLISHED" />
                <button type="submit" class="btn btn-sm btn-success">
                  Publish
                </button>
              </Form>
              <Form action={bulkAction}>
                <input type="hidden" name="blogIds" value={JSON.stringify(selectedBlogs.value)} />
                <input type="hidden" name="status" value="DRAFT" />
                <button type="submit" class="btn btn-sm btn-warning">
                  Draft
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  class="checkbox"
                  checked={selectedBlogs.value.length === filteredBlogs.value.length && filteredBlogs.value.length > 0}
                  onChange$={handleSelectAll}
                />
              </th>
              <th>Title</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.value.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <input
                    type="checkbox"
                    class="checkbox"
                    checked={selectedBlogs.value.includes(blog.id)}
                    onChange$={() => handleSelectBlog(blog.id)}
                  />
                </td>
                <td>
                  <div>
                    <div class="font-medium">{blog.title}</div>
                    {blog.summary && (
                      <div class="text-sm text-gray-500 truncate max-w-xs">
                        {blog.summary}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div class={`badge ${
                    (blog.status === 'PUBLISHED' || blog.status === 'published') ? 'badge-success' :
                    (blog.status === 'DRAFT' || blog.status === 'draft') ? 'badge-warning' :
                    'badge-error'
                  }`}>
                    {blog.status.toUpperCase()}
                  </div>
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} class="badge badge-outline badge-sm">
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span class="badge badge-outline badge-sm">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td>{formatDate(blog.createdAt)}</td>
                <td>{formatDate(blog.updatedAt)}</td>
                <td>
                  <div class="flex gap-2">
                    <a href={`/admin/blogs/${blog.id}/edit`} class="btn btn-sm btn-primary">
                      Edit
                    </a>
                    <a href={`/blog/${blog.slug}`} class="btn btn-sm btn-ghost" target="_blank">
                      View
                    </a>
                    <Form action={deleteAction}>
                      <input type="hidden" name="id" value={blog.id} />
                      <button 
                        type="submit" 
                        class="btn btn-sm btn-error"
                        onClick$={(e) => {
                          if (!confirm('Are you sure you want to delete this blog?')) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </Form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBlogs.value.length === 0 && (
          <div class="text-center py-8 text-gray-500">
            {blogsData.value.error ? (
              <div class="alert alert-error">
                <span>{blogsData.value.error}</span>
              </div>
            ) : (
              <div>
                {searchTerm.value || statusFilter.value !== 'ALL' 
                  ? 'No blogs found matching your criteria.' 
                  : 'No blogs available. Create your first blog!'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Results */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>Blog deleted successfully!</span>
          </div>
        </div>
      )}
      
      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-error">
            <span>{deleteAction.value.error}</span>
          </div>
        </div>
      )}

      {bulkAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>Bulk action completed successfully!</span>
          </div>
        </div>
      )}
      
      {bulkAction.value?.error && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-error">
            <span>{bulkAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});