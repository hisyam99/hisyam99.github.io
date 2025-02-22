import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import ImgReparin from "~/media/reparin.png?jsx";
import ImgXZ from "~/media/blog/xz-manpage.avif?jsx";

export default component$(() => {
  return (
    <section class="mt-16 min-h-screen">
      <div class="container mx-auto px-6 py-10">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold  capitalize lg:text-3xl ">
            postingan terbaru{" "}
          </h1>

          <button class="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6  transform transition-colors duration-300  hover:text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <hr class="my-8 border-gray-200 dark:border-gray-700" />

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <ImgReparin class="h-64 w-full rounded-lg object-cover object-center lg:h-80" />

            <div class="mt-8">
              <span class="uppercase text-primary">startup</span>

              <h1 class="mt-4 text-xl font-semibold">
                Reparin : #MauService? Reparin aja !
              </h1>

              <p class="mt-2">
                Reparin bertujuan untuk memberikan kemudahan bagi pengguna dalam
                menemukan teknisi perbaikan yang terpercaya, berkualitas, dan
                tepat waktu.
              </p>

              <div class="mt-4 flex items-center justify-between">
                <div>
                  <Link href="#" class="text-lg font-medium hover:underline">
                    Muhammad Hisyam Kamil
                  </Link>

                  <p class="text-sm">Juni 11, 2024</p>
                </div>

                <Link
                  href="https://reparin.xyz/about"
                  class="inline-block text-primary underline hover:text-blue-400"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>

          <div>
            <ImgXZ class="h-64 w-full rounded-lg object-cover object-center lg:h-80" />
            <div class="mt-8">
              <span class="uppercase text-primary">linux</span>

              <h1 class="mt-4 text-xl font-semibold">
                Arch Linux: Paket xz telah di-backdoor
              </h1>

              <p class="mt-2">
                As many of you may have already read (one), the upstream release
                tarballs for xz in version 5.6.0 and 5.6.1 contain malicious
                code which adds a backdoor.
              </p>

              <div class="mt-4 flex items-center justify-between">
                <div>
                  <Link href="#" class="text-lg font-medium hover:underline">
                    David Runge
                  </Link>

                  <p class="text-sm">Maret 29, 2024</p>
                </div>

                <Link
                  href="https://archlinux.org/news/the-xz-package-has-been-backdoored"
                  class="inline-block text-primary underline hover:text-blue-400"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>

          <div class="flex w-full flex-col space-y-8">
            <div>
              <div class="skeleton h-80 w-full rounded-lg"></div>
            </div>
            <div class=" flex  flex-col justify-between space-y-16">
              <div>
                <div class="skeleton h-4 w-1/4"></div>
                <div class="skeleton mt-2 h-6 w-full"></div>
                <div class="skeleton mt-2 h-4 w-full"></div>
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="skeleton h-4 w-20"></div>
                    <div class="skeleton mt-1 h-3 w-16"></div>
                  </div>
                  <div class="skeleton h-4 w-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Hisyam99 | Blogs",
};
