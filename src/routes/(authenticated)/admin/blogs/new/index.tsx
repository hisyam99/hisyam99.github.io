import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeAction$, Form, z, zod$, Link } from "@builder.io/qwik-city";
import { createBlog } from "~/services/admin-blog";
import RichTextEditor from "~/components/admin/RichTextEditor";
import { checkAuth } from "~/utils/auth-middleware";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(500, "Summary too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  author: z.string().min(1, "Author is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  tags: z.string().min(1, "At least one tag is required"),
  metaDescription: z
    .string()
    .min(1, "Meta description is required")
    .max(160, "Meta description too long"),
});

export const useCreateBlog = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const tagsArray = (data.tags as string)
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const blogData = {
      title: data.title as string,
      content: data.content as string,
      summary: data.summary as string,
      slug: data.slug as string,
      author: data.author as string,
      status: data.status as "DRAFT" | "PUBLISHED",
      tags: tagsArray,
      metaDescription: data.metaDescription as string,
    };

    await createBlog(token, blogData);

    throw requestEvent.redirect(302, "/admin/blogs");
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    console.error("Failed to create blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
}, zod$(blogSchema));

export default component$(() => {
  const createAction = useCreateBlog();

  const title = useSignal("");
  const content = useSignal("");
  const summary = useSignal("");
  const slug = useSignal("");
  const author = useSignal("");
  const status = useSignal<"DRAFT" | "PUBLISHED">("DRAFT");
  const tags = useSignal("");
  const metaDescription = useSignal("");

  const generateSlug = $(() => {
    if (title.value) {
      const generatedSlug = title.value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      slug.value = generatedSlug;
    }
  });

  const handleContentChange = $((newContent: string) => {
    content.value = newContent;
  });

  return (
    <div class="space-y-4 lg:space-y-6">
      {/* Header */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Create New Blog
          </h1>
          <p class="text-sm text-base-content/70 mt-1">
            Write and publish your blog post
          </p>
        </div>
        <Link href="/admin/blogs" class="btn btn-ghost gap-2 w-full sm:w-auto">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blogs
        </Link>
      </div>

      <Form action={createAction} class="w-full">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content - 2 columns on large screens */}
          <div class="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Title Card */}
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body p-4 sm:p-6">
                <h2 class="card-title text-lg sm:text-xl mb-4">
                  Basic Information
                </h2>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Title <span class="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    class="input input-bordered w-full"
                    placeholder="Enter an engaging title for your blog post"
                    value={title.value}
                    onInput$={(e) => {
                      title.value = (e.target as HTMLInputElement).value;
                    }}
                    onBlur$={generateSlug}
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">
                      Make it catchy and SEO-friendly
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Content Editor Card */}
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body p-4 sm:p-6">
                <label class="label">
                  <span class="label-text font-semibold text-lg">
                    Content <span class="text-error">*</span>
                  </span>
                </label>
                <div class="w-full">
                  <RichTextEditor
                    value={content.value}
                    onValueChange={handleContentChange}
                    placeholder="Write your blog content here. Use the toolbar to format text, add links, and more..."
                    minHeight="500px"
                  />
                </div>
                <input type="hidden" name="content" value={content.value} />
                <label class="label">
                  <span class="label-text-alt text-base-content/60">
                    {content.value.length} characters
                  </span>
                </label>
              </div>
            </div>

            {/* Summary Card */}
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body p-4 sm:p-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Summary <span class="text-error">*</span>
                    </span>
                    <span class="label-text-alt">
                      {summary.value.length}/500
                    </span>
                  </label>
                  <textarea
                    name="summary"
                    class="textarea textarea-bordered h-24 sm:h-32"
                    placeholder="Write a brief summary that will appear in blog listings..."
                    value={summary.value}
                    onInput$={(e) => {
                      summary.value = (e.target as HTMLTextAreaElement).value;
                    }}
                    maxLength={500}
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">
                      Brief overview of your blog post
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column on large screens */}
          <div class="space-y-4 lg:space-y-6">
            {/* Publish Settings Card */}
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body p-4 sm:p-6">
                <h3 class="card-title text-base sm:text-lg mb-4">
                  <svg
                    class="w-5 h-5"
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
                  Publish Settings
                </h3>

                {/* Status */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Status <span class="text-error">*</span>
                    </span>
                  </label>
                  <select
                    name="status"
                    class="select select-bordered w-full"
                    value={status.value}
                    onChange$={(e) => {
                      status.value = (e.target as HTMLSelectElement).value as
                        | "DRAFT"
                        | "PUBLISHED";
                    }}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                  <label class="label">
                    <span class="label-text-alt">
                      {status.value === "DRAFT"
                        ? "Save as draft for later"
                        : "Publish immediately"}
                    </span>
                  </label>
                </div>

                {/* Author */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Author <span class="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    class="input input-bordered w-full"
                    placeholder="Author name"
                    value={author.value}
                    onInput$={(e) => {
                      author.value = (e.target as HTMLInputElement).value;
                    }}
                    required
                  />
                </div>

                <div class="divider my-2"></div>

                {/* Action Buttons */}
                <div class="flex flex-col gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary w-full gap-2"
                    disabled={!title.value || !content.value || !summary.value}
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {status.value === "PUBLISHED"
                      ? "Publish Blog"
                      : "Save as Draft"}
                  </button>

                  {status.value === "PUBLISHED" && (
                    <button
                      type="button"
                      class="btn btn-outline w-full gap-2"
                      onClick$={() => {
                        status.value = "DRAFT";
                        const form = document.querySelector(
                          "form",
                        ) as HTMLFormElement;
                        form?.requestSubmit();
                      }}
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Save as Draft Instead
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Settings Card */}
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body p-4 sm:p-6">
                <h3 class="card-title text-base sm:text-lg mb-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  SEO Settings
                </h3>

                {/* Slug */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      URL Slug <span class="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    class="input input-bordered w-full"
                    placeholder="url-friendly-slug"
                    value={slug.value}
                    onInput$={(e) => {
                      slug.value = (e.target as HTMLInputElement).value;
                    }}
                    pattern="^[a-z0-9-]+$"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt text-xs break-all">
                      URL: /blog/{slug.value || "your-slug"}
                    </span>
                  </label>
                </div>

                {/* Meta Description */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Meta Description <span class="text-error">*</span>
                    </span>
                    <span class="label-text-alt">
                      {metaDescription.value.length}/160
                    </span>
                  </label>
                  <textarea
                    name="metaDescription"
                    class="textarea textarea-bordered h-20"
                    placeholder="SEO meta description for search engines"
                    value={metaDescription.value}
                    onInput$={(e) => {
                      metaDescription.value = (
                        e.target as HTMLTextAreaElement
                      ).value;
                    }}
                    maxLength={160}
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt">
                      Appears in search results
                    </span>
                  </label>
                </div>

                {/* Tags */}
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">
                      Tags <span class="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="tags"
                    class="input input-bordered w-full"
                    placeholder="technology, programming, web"
                    value={tags.value}
                    onInput$={(e) => {
                      tags.value = (e.target as HTMLInputElement).value;
                    }}
                    required
                  />
                  <label class="label">
                    <span class="label-text-alt">
                      Separate tags with commas
                    </span>
                  </label>
                  {tags.value && (
                    <div class="flex flex-wrap gap-1 mt-2">
                      {tags.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag)
                        .map((tag) => (
                          <span key={tag} class="badge badge-primary badge-sm">
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div class="card bg-info/10 shadow-lg hidden lg:block">
              <div class="card-body p-4">
                <h3 class="font-semibold flex items-center gap-2 mb-2">
                  <svg
                    class="w-5 h-5 text-info"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Quick Tips
                </h3>
                <ul class="text-xs space-y-1 text-base-content/70">
                  <li>• Use clear, descriptive titles</li>
                  <li>• Keep meta descriptions under 160 characters</li>
                  <li>• Add relevant tags for better discoverability</li>
                  <li>• Preview before publishing</li>
                  <li>• Use images to break up text</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {createAction.value?.error && (
          <div class="alert alert-error shadow-lg mt-6">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{createAction.value.error}</span>
          </div>
        )}

        {createAction.value?.fieldErrors && (
          <div class="alert alert-error shadow-lg mt-6">
            <div class="w-full">
              <div class="font-semibold flex items-center gap-2 mb-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Please fix the following errors:
              </div>
              <ul class="list-disc list-inside space-y-1 text-sm">
                {Object.entries(createAction.value.fieldErrors).map(
                  ([field, errors]) => (
                    <li key={field}>
                      <strong class="capitalize">{field}:</strong>{" "}
                      {Array.isArray(errors) ? errors.join(", ") : errors}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
});
