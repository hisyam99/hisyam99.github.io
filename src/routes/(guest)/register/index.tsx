import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { RegisterForm } from '~/components/auth/RegisterForm';

export default component$(() => {
  return <RegisterForm />;
});

export const head: DocumentHead = {
  title: 'Register - Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Create a new account',
    },
  ],
};