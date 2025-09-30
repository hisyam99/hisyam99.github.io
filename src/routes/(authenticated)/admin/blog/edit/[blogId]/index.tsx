import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { StaticGenerateHandler } from '@builder.io/qwik-city';
import { BlogEditor } from '~/components/blog/BlogEditor';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Skip static generation for admin routes to avoid SSR issues
  return {
    params: []
  };
};

export default component$(() => {
  const location = useLocation();
  const blogId = location.params.blogId;

  if (!blogId) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>Invalid blog ID</span>
        </div>
        <div class="mt-8 text-center">
          <a href="/blog" class="btn btn-primary">
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  return <BlogEditor blogId={blogId} />;
});