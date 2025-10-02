import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { createUser } from "~/services/user";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER", "GUEST"]).optional(),
});

export const useCreateUser = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = createUserSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await createUser(token, {
      name: validation.data.name,
      email: validation.data.email,
      role: validation.data.role,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "Failed to create user" };
  }
});

export default component$(() => {
  const createUserAction = useCreateUser();

  return (
    <div class="admin-new-user">
      <h1 class="text-2xl font-bold mb-6">Create New User</h1>

      <Form action={createUserAction} class="form-control">
        <div class="mb-4">
          <label class="label">Name</label>
          <input
            type="text"
            name="name"
            class="input input-bordered"
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Email</label>
          <input
            type="email"
            name="email"
            class="input input-bordered"
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Role</label>
          <select name="role" class="select select-bordered">
            <option value="VIEWER" selected>
              Viewer
            </option>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
            <option value="GUEST">Guest</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          Create User
        </button>
      </Form>
    </div>
  );
});
