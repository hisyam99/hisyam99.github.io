import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface BottomNavbarProps {}

export const BottomNavbar = component$<BottomNavbarProps>(() => {
  return (
    <div class="lg:hidden">
      <div class="btm-nav bg-base-300 bg-opacity-75 rounded-t-box sticky backdrop-blur">
        <div class="mx-auto grid h-full max-w-lg grid-cols-5">
          <Link href="/">
            <button
              class="btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center"
              data-tip="Home"
            >
              <svg
                class="h-6 w-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span class="sr-only">Home</span>
            </button>
          </Link>
          <Link href="/blog">
            <button
              class="btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center"
              data-tip="Blogs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />
              </svg>
              <span class="sr-only">Blogs</span>
            </button>
          </Link>
          <Link href="https://zap.hisyam99.my.id">
            <div class="flex items-center justify-center">
              <button
                class="btn btn-circle btn-primary tooltip flex items-center justify-center"
                data-tip="New item"
              >
                <svg
                  class="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                <span class="sr-only">New Short Link</span>
              </button>
            </div>
          </Link>
          <Link href="/404">
            <button
              class="btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center"
              data-tip="Settings"
            >
              <svg
                class="h-6 w-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                />
              </svg>
              <span class="sr-only">Settings</span>
            </button>
          </Link>
          <Link href="/404">
            <button
              class="btn btn-circle btn-ghost tooltip mx-auto flex items-center justify-center"
              data-tip="Profile"
            >
              <svg
                class="h-6 w-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span class="sr-only">Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});
