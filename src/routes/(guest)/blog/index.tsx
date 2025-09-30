import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PublicBlogList } from "~/components/blog/PublicBlogList";

export default component$(() => {
  return <PublicBlogList />;
});

export const head: DocumentHead = {
  title: "Blog - hisyam99",
  meta: [
    {
      name: "description",
      content: "Read my latest blog posts about web development, technology, and programming insights.",
    },
  ],
};