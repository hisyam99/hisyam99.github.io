import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { useAdminUserLoader } from "~/hooks/data-loaders";
import { updateUser } from "~/services/admin-users";
import { z } from "zod";
import { checkAuth } from "~/utils/auth-middleware";

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER", "GUEST"]),
  isActive: z.boolean(),
});

export const useUpdateUser = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();
  const userId = requestEvent.params.id;

  if (!auth.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  const validation = updateUserSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await updateUser(token, { ...validation.data, id: userId });
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
});

export default component$(() => {
  const userData = useAdminUserLoader();
  const updateUserAction = useUpdateUser();

  if (userData.value.error) {
    return <div class="alert alert-error">{userData.value.error}</div>;
  }

  const user = userData.value.user;
  if (!user) {
    return <div class="alert alert-error">User not found</div>;
  }

  return (
    <div class="admin-edit-user">
      <h1 class="text-2xl font-bold mb-6">Edit User: {user.name}</h1>

      <Form action={updateUserAction} class="form-control">
        <div class="mb-4">
          <label class="label">Name</label>
          <input
            type="text"
            name="name"
            class="input input-bordered"
            value={user.name}
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Email</label>
          <input
            type="email"
            name="email"
            class="input input-bordered"
            value={user.email}
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Role</label>
          <select name="role" class="select select-bordered" required>
            <option value="ADMIN" selected={user.role === "ADMIN"}>
              Admin
            </option>
            <option value="EDITOR" selected={user.role === "EDITOR"}>
              Editor
            </option>
            <option value="VIEWER" selected={user.role === "VIEWER"}>
              Viewer
            </option>
            <option value="GUEST" selected={user.role === "GUEST"}>
              Guest
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="label">Active</label>
          <input
            type="checkbox"
            name="isActive"
            class="checkbox"
            checked={user.isActive}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Update User
        </button>
      </Form>
    </div>
  );
});
