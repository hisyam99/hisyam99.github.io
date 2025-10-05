import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, z, zod$, Link } from "@builder.io/qwik-city";
import { createUser } from "~/services/admin-users";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER", "GUEST"]),
});

export const useCreateUser = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const userData = {
      name: data.name as string,
      email: data.email as string,
      role: data.role as "ADMIN" | "EDITOR" | "VIEWER" | "GUEST",
    };

    await createUser(token, userData);

    // Redirect to users list after successful creation
    throw requestEvent.redirect(302, "/admin/users");
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }

    console.error("Failed to create user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}, zod$(createUserSchema));

export default component$(() => {
  const createAction = useCreateUser();

  const name = useSignal("");
  const email = useSignal("");
  const role = useSignal<"ADMIN" | "EDITOR" | "VIEWER" | "GUEST">("VIEWER");

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Create New User</h1>
        <Link href="/admin/users" class="btn btn-ghost">
          ← Back to Users
        </Link>
      </div>

      <div class="max-w-2xl">
        <Form action={createAction} class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-6">User Information</h2>

            {/* Name Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Name *</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                class="input input-bordered w-full"
                value={name.value}
                onInput$={(e) => {
                  name.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
            </div>

            {/* Email Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Email *</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                class="input input-bordered w-full"
                value={email.value}
                onInput$={(e) => {
                  email.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
            </div>

            {/* Role Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Role *</span>
              </label>
              <select
                name="role"
                class="select select-bordered w-full"
                value={role.value}
                onChange$={(e) => {
                  role.value = (e.target as HTMLSelectElement).value as
                    | "ADMIN"
                    | "EDITOR"
                    | "VIEWER"
                    | "GUEST";
                }}
              >
                <option value="VIEWER">Viewer - Can view content</option>
                <option value="EDITOR">
                  Editor - Can create and edit content
                </option>
                <option value="ADMIN">Admin - Full access</option>
                <option value="GUEST">Guest - Limited access</option>
              </select>
              <div class="label">
                <span class="label-text-alt">
                  Choose the appropriate role for this user
                </span>
              </div>
            </div>

            {/* Error Display */}
            {createAction.value?.error && (
              <div class="alert alert-error">
                <span>{createAction.value.error}</span>
              </div>
            )}

            {/* Actions */}
            <div class="card-actions justify-end mt-6">
              <Link href="/admin/users" class="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                class="btn btn-primary"
                disabled={createAction.isRunning}
              >
                {createAction.isRunning ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});
