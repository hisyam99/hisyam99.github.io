import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  RequestHandler,
  useLocation,
} from "@builder.io/qwik-city";
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
  const location = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // Track location changes to re-trigger animation
    track(() => location.url.pathname);

    // Get main content element
    const contentElement = document.querySelector(
      ".admin-content-wrapper",
    ) as HTMLElement;
    if (!contentElement) return;

    // Remove animation class first (for route changes)
    contentElement.classList.remove("animate-slideInBlur");

    // Force reflow to restart animation
    void contentElement.offsetWidth;

    // Add animation class
    contentElement.classList.add("animate-slideInBlur");
  });

  return (
    <AdminLayout authData={authData.value}>
      <div class="admin-content-wrapper animate-slideInBlur">
        <Slot />
      </div>
    </AdminLayout>
  );
});
