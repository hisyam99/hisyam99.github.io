import { component$, useSignal, $ } from '@builder.io/qwik';
import { routeAction$, Form, z, zod$ } from '@builder.io/qwik-city';
import { createBlog } from '~/services/admin-blog';
import RichTextEditor from '~/components/admin/RichTextEditor';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  summary: z.string().min(1, 'Summary is required').max(500, 'Summary too long'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  author: z.string().min(1, 'Author is required'),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  tags: z.string().min(1, 'At least one tag is required'),
  metaDescription: z.string().min(1, 'Meta description is required').max(160, 'Meta description too long')
});

export const useCreateBlog = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get('accessToken')?.value;
  
  if (!token) {
    return {
      success: false,
      error: 'Not authenticated'
    };
  }

  try {
    const tagsArray = (data.tags as string).split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const blogData = {
      title: data.title as string,
      content: data.content as string,
      summary: data.summary as string,
      slug: data.slug as string,
      author: data.author as string,
      status: data.status as 'DRAFT' | 'PUBLISHED',
      tags: tagsArray,
      metaDescription: data.metaDescription as string
    };

    await createBlog(token, blogData);
    
    throw requestEvent.redirect(302, '/admin/blogs');
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }
    
    console.error('Failed to create blog:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create blog' 
    };
  }
}, zod$(blogSchema));

export default component$(() => {
  const createAction = useCreateBlog();
  
  const title = useSignal('');
  const content = useSignal('');
  const summary = useSignal('');
  const slug = useSignal('');
  const author = useSignal('');
  const status = useSignal<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const tags = useSignal('');
  const metaDescription = useSignal('');

  const generateSlug = $(() => {
    if (title.value) {
      const generatedSlug = title.value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      slug.value = generatedSlug;
    }
  });

  const handleContentChange = $((newContent: string) => {
    content.value = newContent;
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Create New Blog</h1>
        <a href="/admin/blogs" class="btn btn-ghost">
          ← Back to Blogs
        </a>
      </div>

      <Form action={createAction} class="max-w-4xl">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div class="lg:col-span-2 space-y-6">
            {/* Title */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Title *</span>
              </label>
              <input
                type="text"
                name="title"
                class="input input-bordered w-full"
                placeholder="Enter blog title"
                value={title.value}
                onInput$={(e) => {
                  title.value = (e.target as HTMLInputElement).value;
                }}
                onBlur$={generateSlug}
                required
              />
            </div>

            {/* Content Editor */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Content *</span>
              </label>
              <RichTextEditor
                value={content.value}
                onValueChange={handleContentChange}
                placeholder="Write your blog content here..."
                minHeight="400px"
              />
              <input type="hidden" name="content" value={content.value} />
            </div>

            {/* Summary */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Summary *</span>
                <span class="label-text-alt">{summary.value.length}/500</span>
              </label>
              <textarea
                name="summary"
                class="textarea textarea-bordered h-24"
                placeholder="Brief summary of the blog post"
                value={summary.value}
                onInput$={(e) => {
                  summary.value = (e.target as HTMLTextAreaElement).value;
                }}
                maxLength={500}
                required
              />
            </div>
          </div>

          {/* Sidebar */}
          <div class="space-y-6">
            {/* Publish Settings */}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title text-lg">Publish Settings</h3>
                
                {/* Status */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Status</span>
                  </label>
                  <select
                    name="status"
                    class="select select-bordered"
                    value={status.value}
                    onChange$={(e) => {
                      status.value = (e.target as HTMLSelectElement).value as 'DRAFT' | 'PUBLISHED';
                    }}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                {/* Author */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Author *</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    class="input input-bordered"
                    placeholder="Author name"
                    value={author.value}
                    onInput$={(e) => {
                      author.value = (e.target as HTMLInputElement).value;
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title text-lg">SEO Settings</h3>
                
                {/* Slug */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Slug *</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    class="input input-bordered"
                    placeholder="url-friendly-slug"
                    value={slug.value}
                    onInput$={(e) => {
                      slug.value = (e.target as HTMLInputElement).value;
                    }}
                    pattern="^[a-z0-9-]+$"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                    required
                  />
                  <div class="label">
                    <span class="label-text-alt">
                      URL: /blog/{slug.value || 'your-slug'}
                    </span>
                  </div>
                </div>

                {/* Meta Description */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Meta Description *</span>
                    <span class="label-text-alt">{metaDescription.value.length}/160</span>
                  </label>
                  <textarea
                    name="metaDescription"
                    class="textarea textarea-bordered h-20"
                    placeholder="SEO meta description"
                    value={metaDescription.value}
                    onInput$={(e) => {
                      metaDescription.value = (e.target as HTMLTextAreaElement).value;
                    }}
                    maxLength={160}
                    required
                  />
                </div>

                {/* Tags */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium">Tags *</span>
                  </label>
                  <input
                    type="text"
                    name="tags"
                    class="input input-bordered"
                    placeholder="tag1, tag2, tag3"
                    value={tags.value}
                    onInput$={(e) => {
                      tags.value = (e.target as HTMLInputElement).value;
                    }}
                    required
                  />
                  <div class="label">
                    <span class="label-text-alt">
                      Separate tags with commas
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div class="card bg-base-200">
              <div class="card-body">
                <div class="flex flex-col gap-2">
                  <button type="submit" class="btn btn-primary">
                    {status.value === 'PUBLISHED' ? 'Publish Blog' : 'Save Blog'}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline"
                    onClick$={() => {
                      status.value = 'DRAFT';
                      // Trigger form submission
                      const form = document.querySelector('form') as HTMLFormElement;
                      form?.requestSubmit();
                    }}
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {createAction.value?.error && (
          <div class="alert alert-error mt-6">
            <span>{createAction.value.error}</span>
          </div>
        )}

        {createAction.value?.fieldErrors && (
          <div class="alert alert-error mt-6">
            <div>
              <div class="font-medium">Please fix the following errors:</div>
              <ul class="list-disc list-inside mt-2">
                {Object.entries(createAction.value.fieldErrors).map(([field, errors]) => (
                  <li key={field}>
                    <strong>{field}:</strong> {Array.isArray(errors) ? errors.join(', ') : errors}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
});