import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, RequestHandler } from "@builder.io/qwik-city";
import AdminLayout from "~/components/admin/AdminLayout";
import { getCurrentUser } from "~/services/auth";

export const onGet: RequestHandler = async (requestEvent) => {
  // Get token from cookie
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  // Check authentication
  const user = await getCurrentUser(token);

  if (!user) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  // Check admin role
  if (user.role !== "ADMIN" && user.role !== "EDITOR") {
    throw requestEvent.redirect(302, "/");
  }
};

export const useAuthData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  const user = await getCurrentUser(token);
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN" || user?.role === "EDITOR",
  };
});

export default component$(() => {
  const authData = useAuthData();

  return (
    <AdminLayout authData={authData.value}>
      <Slot />
    </AdminLayout>
  );
});
