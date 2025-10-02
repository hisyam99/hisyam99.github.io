import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, Link } from "@builder.io/qwik-city";
import { useAdminResumeContentsLoader } from "~/hooks/data-loaders";
import { deleteResumeContent } from "~/services/category";
import type { ResumeContent } from "~/services/category";

export { useAdminResumeContentsLoader };

export const useDeleteResumeContent = routeAction$(
  async (data, requestEvent) => {
    const token = requestEvent.cookie.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    try {
      await deleteResumeContent(token, String(data.resumeContentId));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete resume content:", error);
      return { success: false, error: "Failed to delete resume content" };
    }
  },
);

export default component$(() => {
  const resumeContentsData = useAdminResumeContentsLoader();
  const deleteResumeContentAction = useDeleteResumeContent();
  const searchSignal = useSignal("");

  return (
    <div class="admin-resume-contents">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Resume Content Management</h1>
        <Link href="/admin/resume-contents/new" class="btn btn-primary">
          Add New Resume Content
        </Link>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search resume contents..."
          class="input input-bordered w-full"
          bind:value={searchSignal}
        />
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumeContentsData.value?.data
              ?.filter((content) =>
                content.title
                  .toLowerCase()
                  .includes(searchSignal.value.toLowerCase()),
              )
              .map((content: ResumeContent) => (
                <tr key={content.id}>
                  <td>{content.title}</td>
                  <td>{content.category.name}</td>
                  <td>{content.description?.substring(0, 50)}...</td>
                  <td>
                    <Link
                      href={`/admin/resume-contents/${content.id}/edit`}
                      class="btn btn-sm btn-outline mr-2"
                    >
                      Edit
                    </Link>
                    <Form action={deleteResumeContentAction}>
                      <input
                        type="hidden"
                        name="resumeContentId"
                        value={content.id}
                      />
                      <button type="submit" class="btn btn-sm btn-error">
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
