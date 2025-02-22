import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="flex min-h-screen items-center p-16">
      <div class="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div class="max-w-md text-center">
          <h2 class="text-primary mb-8 text-9xl font-bold">
            <span class="sr-only">Error</span>
            <span>404</span>
          </h2>
          <p class="text-3xl font-medium md:text-3xl">Hehe belum ada.</p>
          <p class="text-muted mt-4 mb-8 text-lg">balik ke homepage yokk.</p>
          <a rel="noopener noreferrer" href="/" class="btn">
            Balik
          </a>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Tidak ada cuy",
};
