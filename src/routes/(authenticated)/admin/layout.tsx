import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  RequestHandler,
  useLocation,
} from "@builder.io/qwik-city";
import AdminLayout from "~/components/admin/AdminLayout";
import { checkAuth } from "~/utils/auth-middleware";

export const onGet: RequestHandler = async (requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  // Check admin role
  if (auth.user?.role !== "ADMIN" && auth.user?.role !== "EDITOR") {
    throw requestEvent.redirect(302, "/");
  }
};

export const useAuthData = routeLoader$(async () => {
  const auth = await checkAuth();

  return {
    user: auth.user,
    isAuthenticated: auth.authenticated,
    isAdmin: auth.user?.role === "ADMIN" || auth.user?.role === "EDITOR",
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
