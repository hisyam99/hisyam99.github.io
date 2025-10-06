import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

export default component$(() => {
  const location = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // Track location changes to re-trigger animation
    track(() => location.url.pathname);

    // Get page content wrapper (not main, to exclude header/footer)
    const contentWrapper = document.querySelector(
      ".page-content-wrapper",
    ) as HTMLElement;
    if (!contentWrapper) return;

    // Remove animation class first (for route changes)
    contentWrapper.classList.remove("animate-slideInBlur");

    // Force reflow to restart animation
    void contentWrapper.offsetWidth;

    // Add animation class
    contentWrapper.classList.add("animate-slideInBlur");
  });

  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="relative flex-1">
        {/* Only this wrapper gets animated, not header/footer */}
        <div class="page-content-wrapper animate-slideInBlur">
          <Slot />
        </div>
      </main>
      <Footer />
    </div>
  );
});
