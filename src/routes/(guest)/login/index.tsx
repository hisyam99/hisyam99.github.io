import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { LoginForm } from '~/components/auth/LoginForm';

export default component$(() => {
  return <LoginForm />;
});

export const head: DocumentHead = {
  title: 'Login - Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Login to your account',
    },
  ],
};