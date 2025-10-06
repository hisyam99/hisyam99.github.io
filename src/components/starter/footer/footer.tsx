import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

export default component$(() => {
  const { ref: footerRef } = useScrollAnimation();

  return (
    <footer ref={footerRef} class="bg-base-200">
      <div class="container mx-auto px-4">
        {/* Main Footer Content */}
        <div class="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          {/* Brand Section */}
          <div class="col-span-1 md:col-span-2">
            <Link href="/" class="text-gradient text-2xl font-bold">
              hisyam99
            </Link>
            <p class="text-content-secondary mt-4 max-w-md">
              Full Stack Developer passionate about creating innovative digital
              solutions. Building modern web applications with cutting-edge
              technologies.
            </p>

            {/* Social Links */}
            <div class="mt-6 flex gap-4">
              <Link
                href="https://github.com/hisyam99"
                target="_blank"
                class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content"
                aria-label="GitHub"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>

              <Link
                href="https://linkedin.com/in/hisyam99"
                target="_blank"
                class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content"
                aria-label="LinkedIn"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>

              <Link
                href="https://twitter.com/hisyam99"
                target="_blank"
                class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content"
                aria-label="Twitter"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>

              <Link
                href="https://www.facebook.com/muh.h.kamil/"
                target="_blank"
                class="btn btn-ghost btn-circle hover:bg-primary hover:text-primary-content"
                aria-label="Facebook"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 class="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <Link
                  href="/"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  class="link link-hover text-content-secondary hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 class="mb-4 text-lg font-semibold">External Links</h3>
            <ul class="space-y-2">
              <li>
                <Link
                  href="https://mil.kamil.my.id"
                  target="_blank"
                  class="link link-hover text-content-secondary hover:text-primary flex items-center gap-2"
                >
                  URL Shortener
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://reparin.my.id"
                  target="_blank"
                  class="link link-hover text-content-secondary hover:text-primary flex items-center gap-2"
                >
                  Reparin
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="https://v2.reparin.my.id"
                  target="_blank"
                  class="link link-hover text-content-secondary hover:text-primary flex items-center gap-2"
                >
                  Reparatech
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hisyam@kamil.my.id"
                  class="link link-hover text-content-secondary hover:text-primary flex items-center gap-2"
                >
                  Email Me
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div class="border-base-300 border-t py-6">
          <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p class="text-content-secondary text-center md:text-left">
              © {new Date().getFullYear()} Muhammad Hisyam Kamil. All rights
              reserved.
            </p>

            <div class="flex items-center gap-4">
              <span class="text-content-secondary text-sm">Built with</span>
              <div class="flex items-center gap-2">
                <Link
                  href="https://qwik.dev"
                  target="_blank"
                  class="text-base-content hover:text-primary hover:underline"
                >
                  Qwik
                </Link>
                <span class="text-content-secondary">+</span>
                <Link
                  href="https://daisyui.com"
                  target="_blank"
                  class="text-base-content hover:text-primary hover:underline"
                >
                  DaisyUI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
