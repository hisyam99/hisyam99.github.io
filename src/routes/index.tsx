import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import Hero from "../components/starter/hero/hero";
import ImgReparin from "~/media/reparin.png?jsx";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

export default component$(() => {
  const projectsStaggerRef = useStaggerAnimation(200);
  const { ref: contactRef } = useScrollAnimation();

  return (
    <>
      <Hero />

      {/* Projects Section */}
      <section id="projects" class="bg-base-200 py-20">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Featured Projects
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
          </div>

          <div
            ref={projectsStaggerRef}
            class="stagger-container grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          >
            {/* Project 1 - Reparin */}
            <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
              <figure>
                <ImgReparin class="h-48 w-full object-cover" alt="Reparin" />
              </figure>
              <div class="card-body">
                <h3 class="card-title">
                  Reparin
                  <div class="badge badge-secondary">Featured</div>
                </h3>
                <p>
                  Platform layanan perbaikan gadget dengan teknologi modern.
                  Menghubungkan teknisi terpercaya dengan pelanggan.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <div class="badge badge-outline">Next.js 14</div>
                  <div class="badge badge-outline">Golang</div>
                  <div class="badge badge-outline">shadcn/ui</div>
                  <div class="badge badge-outline">Bun</div>
                </div>
                <div class="card-actions mt-4 justify-end">
                  <Link
                    href="https://reparin.my.id"
                    target="_blank"
                    class="btn btn-primary btn-sm hover-scale"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href="https://github.com/hisyam99/reparin"
                    target="_blank"
                    class="btn btn-ghost btn-sm"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 2 - URL Shortener */}
            <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
              <figure class="from-primary to-secondary bg-gradient-to-br">
                <div class="flex h-48 w-full items-center justify-center">
                  <svg
                    class="text-base-100 h-24 w-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </div>
              </figure>
              <div class="card-body">
                <h3 class="card-title">
                  URL Shortener
                  <div class="badge badge-primary">New</div>
                </h3>
                <p>
                  Aplikasi pemendek URL yang cepat dan efisien dengan analytics
                  dashboard untuk tracking link performance.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <div class="badge badge-outline">Node.js</div>
                  <div class="badge badge-outline">Express</div>
                  <div class="badge badge-outline">MongoDB</div>
                  <div class="badge badge-outline">React</div>
                </div>
                <div class="card-actions mt-4 justify-end">
                  <Link
                    href="https://mil.kamil.my.id"
                    target="_blank"
                    class="btn btn-primary btn-sm hover-scale"
                  >
                    Live Demo
                  </Link>
                  <button class="btn btn-ghost btn-sm">
                    <svg
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </button>
                </div>
              </div>
            </div>

            {/* Project 3 - Reparatech */}
            <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
              <figure class="from-accent to-info bg-gradient-to-br">
                <div class="flex h-48 w-full items-center justify-center">
                  <svg
                    class="text-base-100 h-24 w-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
              </figure>
              <div class="card-body">
                <h3 class="card-title">
                  Reparatech
                  <div class="badge badge-accent">V2</div>
                </h3>
                <p>
                  Platform reparasi teknologi versi 2 dengan fitur advanced dan
                  performa yang lebih baik untuk kebutuhan service modern.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <div class="badge badge-outline">React</div>
                  <div class="badge badge-outline">Node.js</div>
                  <div class="badge badge-outline">Express</div>
                  <div class="badge badge-outline">MongoDB</div>
                </div>
                <div class="card-actions mt-4 justify-end">
                  <Link
                    href="https://v2.reparin.my.id"
                    target="_blank"
                    class="btn btn-primary btn-sm hover-scale"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href="https://github.com/hisyam99/reparatech"
                    target="_blank"
                    class="btn btn-ghost btn-sm"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 4 - Portfolio */}
            <div class="card bg-base-100 hover-lift hover-glow shadow-xl">
              <figure class="from-secondary to-accent bg-gradient-to-br">
                <div class="flex h-48 w-full items-center justify-center">
                  <svg
                    class="text-base-100 h-24 w-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </figure>
              <div class="card-body">
                <h3 class="card-title">Personal Portfolio</h3>
                <p>
                  Portfolio website modern dengan Qwik framework dan DaisyUI v5
                  untuk performa optimal dan design yang menarik.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <div class="badge badge-outline">Qwik</div>
                  <div class="badge badge-outline">TypeScript</div>
                  <div class="badge badge-outline">DaisyUI v5</div>
                  <div class="badge badge-outline">Tailwind</div>
                </div>
                <div class="card-actions mt-4 justify-end">
                  <Link href="/" class="btn btn-primary btn-sm hover-scale">
                    You're Here!
                  </Link>
                  <Link
                    href="https://github.com/hisyam99/hisyam99.github.io"
                    target="_blank"
                    class="btn btn-ghost btn-sm"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <Link href="/projects" class="btn btn-outline btn-primary">
              View All Projects
              <svg
                class="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" class="py-20">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Get In Touch
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto mb-8 h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
            <p class="text-base-content/70 mx-auto max-w-2xl text-lg">
              I'm always open to discussing new opportunities, interesting
              projects, or just having a chat about technology. Feel free to
              reach out!
            </p>
          </div>

          <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div class="space-y-8">
              <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                  <h3 class="card-title mb-4">Contact Information</h3>

                  <div class="space-y-4">
                    <a
                      href="mailto:hisyam@kamil.my.id"
                      class="hover:text-primary flex items-center gap-4 transition-colors"
                    >
                      <div class="btn btn-circle btn-primary btn-sm">
                        <svg
                          class="h-5 w-5"
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
                      </div>
                      <span>hisyam@kamil.my.id</span>
                    </a>

                    <a
                      href="https://github.com/hisyam99"
                      target="_blank"
                      class="hover:text-primary flex items-center gap-4 transition-colors"
                    >
                      <div class="btn btn-circle btn-primary btn-sm">
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <span>github.com/hisyam99</span>
                    </a>

                    <a
                      href="https://linkedin.com/in/hisyam99"
                      target="_blank"
                      class="hover:text-primary flex items-center gap-4 transition-colors"
                    >
                      <div class="btn btn-circle btn-primary btn-sm">
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <span>linkedin.com/in/hisyam99</span>
                    </a>

                    <div class="flex items-center gap-4">
                      <div class="btn btn-circle btn-primary btn-sm">
                        <svg
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <span>Indonesia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div class="card from-primary to-secondary text-primary-content bg-gradient-to-r shadow-xl">
                <div class="card-body">
                  <div class="flex items-center gap-3">
                    <div class="badge badge-success badge-lg gap-2">
                      <div class="h-2 w-2 animate-pulse rounded-full bg-current"></div>
                      Available
                    </div>
                    <span class="text-lg font-semibold">
                      Open for opportunities
                    </span>
                  </div>
                  <p class="mt-2">
                    Currently looking for exciting projects and collaborations.
                    Let's build something amazing together!
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Contact Form */}
            <div class="card from-base-200 to-base-300 border-base-content/10 border bg-gradient-to-br shadow-xl">
              <div class="card-body">
                <h3 class="card-title mb-6 text-center text-2xl">
                  <svg
                    class="mr-2 h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  Send Message
                </h3>

                <form class="space-y-6">
                  {/* Name Field */}
                  <div class="form-floating">
                    <div class="form-control">
                      <label for="name" class="label">
                        <span class="label-text">Your Name</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder=" "
                        class="input input-bordered focus:input-primary w-full transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div class="form-floating">
                    <div class="form-control">
                      <label for="email" class="label">
                        <span class="label-text">Email Address</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" "
                        class="input input-bordered focus:input-primary w-full transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div class="form-floating">
                    <div class="form-control">
                      <label for="subject" class="label">
                        <span class="label-text">Subject</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder=" "
                        class="input input-bordered focus:input-primary w-full transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div class="form-floating">
                    <div class="form-control">
                      <label for="message" class="label">
                        <span class="label-text">Your Message</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder=" "
                        class="textarea textarea-bordered focus:textarea-primary h-32 w-full resize-none transition-all duration-200"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg group w-full transition-all duration-300 hover:shadow-lg"
                  >
                    <svg
                      class="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                    Send Message
                  </button>

                  {/* Alternative Contact Methods */}
                  <div class="divider">Or reach out directly</div>

                  <div class="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="mailto:hisyam@kamil.my.id"
                      class="btn btn-outline btn-sm flex-1"
                    >
                      <svg
                        class="mr-2 h-4 w-4"
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
                      Email
                    </a>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      class="btn btn-outline btn-sm flex-1"
                    >
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Muhammad Hisyam Kamil - Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Full Stack Developer passionate about building innovative digital solutions. Specializing in modern web technologies.",
    },
    {
      name: "keywords",
      content:
        "Muhammad Hisyam Kamil, hisyam99, Full Stack Developer, Web Developer, Indonesia, Portfolio",
    },
  ],
};
