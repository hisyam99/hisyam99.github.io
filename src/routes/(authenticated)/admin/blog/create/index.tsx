import { component$ } from '@builder.io/qwik';
import type { StaticGenerateHandler } from '@builder.io/qwik-city';
import { BlogEditor } from '~/components/blog/BlogEditor';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Skip static generation for admin routes to avoid SSR issues
  return {
    params: []
  };
};

export default component$(() => {
  return <BlogEditor />;
});