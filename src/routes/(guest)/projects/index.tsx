import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PublicProjectList } from '~/components/project/PublicProjectList';

export default component$(() => {
  return <PublicProjectList />;
});

export const head: DocumentHead = {
  title: "Projects - hisyam99",
  meta: [
    {
      name: "description",
      content: "Explore my portfolio of projects, experiments, and contributions to web development.",
    },
  ],
};