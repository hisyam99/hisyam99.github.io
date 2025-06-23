import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../components/starter/header/header";
import Footer from "../components/starter/footer/footer";
import { BottomNavbar } from "~/components/BottomNavbar/BottomNavbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <Header />
      <main class="flex-grow pt-16">
        <Slot />
      </main>
      <Footer />
      <div class="sticky bottom-0 z-40">
        <BottomNavbar />
      </div>
    </div>
  );
});
