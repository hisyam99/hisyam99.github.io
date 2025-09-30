import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { BlogDetail } from '~/components/blog/BlogDetail';

export default component$(() => {
  const location = useLocation();
  const slug = location.params.slug;

  if (!slug) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>Invalid blog slug</span>
        </div>
        <div class="mt-8 text-center">
          <a href="/blog" class="btn btn-primary">
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  return <BlogDetail slug={slug} />;
});