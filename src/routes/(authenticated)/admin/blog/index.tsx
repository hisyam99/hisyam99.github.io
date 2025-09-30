import { component$ } from '@builder.io/qwik';
import type { StaticGenerateHandler } from '@builder.io/qwik-city';
import { BlogList } from '~/components/blog/BlogList';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Skip static generation for admin routes to avoid SSR issues
  return {
    params: []
  };
};

export default component$(() => {
  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Blog Management</h1>
        <p class="text-base-content/70">
          Manage your blog posts - create, edit, and delete articles.
        </p>
      </div>
      
      <BlogList />
    </div>
  );
});