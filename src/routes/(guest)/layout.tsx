import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "../../components/starter/header/header";
import Footer from "../../components/starter/footer/footer";
import { BottomNavbar } from "~/components/BottomNavbar/BottomNavbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <div class="relative min-h-screen">
      <Header />
      <main class="relative">
        <Slot />
      </main>
      <Footer />
      <div class="sticky bottom-0 z-40">
        <BottomNavbar />
      </div>
    </div>
  );
});