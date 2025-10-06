import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ImgHisyam from "~/media/hisyam.jpg?jsx";
import {
  QReactIcon,
  QVueIcon,
  QTypeScriptIcon,
  QNodeIcon,
  QTailwindIcon,
  QGitIcon,
  QQwikIcon,
  QLinuxIcon,
  QDenoIcon,
  QGoIcon,
  QPythonIcon,
  QMongoDBIcon,
  QPostgreSQLIcon,
  QDockerIcon,
  QRedisIcon,
  QExpressIcon,
  QPrismaIcon,
  QBunIcon,
  QMariaDBIcon,
} from "~/integrations/react/tech-icons";

export default component$(() => {
  return (
    <>
      {/* Hero Section */}
      <section class="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Background gradients */}
        <div class="absolute inset-0 -z-10">
          <div class="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-br via-transparent"></div>
          <div class="bg-primary/30 absolute top-0 left-0 h-72 w-72 animate-pulse rounded-full blur-3xl"></div>
          <div class="bg-secondary/30 absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 py-20">
          <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
            {/* Text Content */}
            <div class="flex-1 text-center lg:text-left">
              <div class="space-y-6">
                <div class="inline-block">
                  <span class="badge badge-primary badge-lg">
                    👋 Welcome to my portfolio
                  </span>
                </div>

                <h1 class="text-5xl font-bold lg:text-7xl">
                  Hi, I'm <span class="text-gradient">Muhammad Hisyam</span>
                </h1>

                <h2 class="text-content-secondary text-2xl lg:text-3xl">
                  Full Stack Developer & Tech Enthusiast
                </h2>

                <p class="text-content-secondary mx-auto max-w-2xl text-lg lg:mx-0">
                  Suka mencoba teknologi baru dan membangun solusi digital yang
                  inovatif. Passionate about creating seamless user experiences
                  and scalable applications.
                </p>

                <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Link href="/projects" class="btn btn-primary btn-lg group">
                    View Projects
                    <svg
                      class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </Link>

                  <Link href="/about" class="btn btn-secondary btn-lg">
                    About Me
                  </Link>

                  <Link href="/resume" class="btn btn-outline btn-lg">
                    View Resume
                  </Link>

                  <Link href="/contact" class="btn btn-accent btn-lg">
                    Get In Touch
                  </Link>
                </div>

                {/* Social Links */}
                <div class="flex justify-center gap-4 pt-4 lg:justify-start">
                  <Link
                    href="https://github.com/hisyam99"
                    target="_blank"
                    class="btn btn-ghost btn-circle hover:text-primary transition-colors"
                    aria-label="Visit my GitHub profile"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="https://linkedin.com/in/hisyam99"
                    target="_blank"
                    class="btn btn-ghost btn-circle hover:text-primary transition-colors"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>

                  <Link
                    href="mailto:hisyam@kamil.my.id"
                    class="btn btn-ghost btn-circle hover:text-primary transition-colors"
                    aria-label="Send me an email"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image */}
            <div class="flex flex-1 justify-center lg:justify-end">
              <div class="group relative">
                {/* Animated geometric background */}
                <div class="animate-spin-slow absolute inset-0">
                  <div class="border-primary/30 absolute inset-0 rounded-full border-2 border-dashed"></div>
                  <div class="border-secondary/40 absolute inset-4 animate-pulse rounded-full border border-dotted"></div>
                </div>

                {/* Holographic glass frame */}
                <div class="relative p-2">
                  <div class="from-primary/20 via-secondary/20 to-accent/20 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r blur-xl"></div>
                  <div class="glass relative rounded-full p-3 transition-all duration-500 hover:scale-105">
                    {/* Floating tech elements */}
                    <div class="bg-primary absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full"></div>
                    <div class="bg-secondary absolute -bottom-3 -left-3 h-3 w-3 animate-pulse rounded-full"></div>
                    <div class="bg-accent absolute top-1/4 -right-4 h-2 w-2 animate-bounce rounded-full"></div>
                    <div class="bg-info absolute bottom-1/4 -left-4 h-2 w-2 animate-pulse rounded-full"></div>

                    {/* Main photo with effects */}
                    <div class="relative">
                      <div class="from-primary to-secondary animate-gradient absolute inset-0 rounded-full bg-gradient-to-br opacity-50"></div>
                      <ImgHisyam
                        class="border-base-content/10 group-hover:shadow-primary/30 relative h-72 w-72 rounded-full border-4 object-cover shadow-2xl filter transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 lg:h-96 lg:w-96"
                        alt="Muhammad Hisyam Kamil"
                      />

                      {/* Overlay effects */}
                      <div class="from-primary/20 to-secondary/20 absolute inset-0 rounded-full bg-gradient-to-t via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>

                    {/* Status indicator */}
                    <div class="bg-base-100/90 border-base-content/10 absolute right-4 bottom-4 flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-sm">
                      <div class="bg-success h-2 w-2 animate-pulse rounded-full"></div>
                      <span class="text-xs font-medium">Available</span>
                    </div>
                  </div>
                </div>

                {/* Orbiting tech icons - Pentagon Formation (5 icons, 72° apart) */}
                <div
                  class="animate-spin-slow absolute inset-0 pointer-events-none"
                  style="--orbit-radius: 160px; --orbit-radius-md: 180px; --orbit-radius-lg: 220px;"
                >
                  {/* Linux - Top (0°) */}
                  <div
                    class="absolute left-1/2 top-1/2 orbit-icon"
                    style="transform: translate(-50%, -50%) rotate(0deg) translateY(-160px) rotate(0deg);"
                  >
                    <div class="bg-base-100 border-primary/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QLinuxIcon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* TypeScript - Top Right (72°) */}
                  <div
                    class="absolute left-1/2 top-1/2 orbit-icon"
                    style="transform: translate(-50%, -50%) rotate(72deg) translateY(-160px) rotate(-72deg);"
                  >
                    <div class="bg-base-100 border-secondary/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QTypeScriptIcon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Qwik - Bottom Right (144°) */}
                  <div
                    class="absolute left-1/2 top-1/2 orbit-icon"
                    style="transform: translate(-50%, -50%) rotate(144deg) translateY(-160px) rotate(-144deg);"
                  >
                    <div class="bg-base-100 border-accent/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QQwikIcon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Encore.dev - Bottom Left (216°) */}
                  <div
                    class="absolute left-1/2 top-1/2 orbit-icon"
                    style="transform: translate(-50%, -50%) rotate(216deg) translateY(-160px) rotate(-216deg);"
                  >
                    <div class="bg-base-100 border-info/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
                      <svg
                        class="h-7 w-7 text-purple-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.47l7 3.5v7.06l-7-3.5V9.47zm16 0v7.06l-7 3.5v-7.06l7-3.5z" />
                      </svg>
                    </div>
                  </div>

                  {/* Go - Top Left (288°) */}
                  <div
                    class="absolute left-1/2 top-1/2 orbit-icon"
                    style="transform: translate(-50%, -50%) rotate(288deg) translateY(-160px) rotate(-288deg);"
                  >
                    <div class="bg-base-100 border-primary/20 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg hover:scale-110 transition-transform pointer-events-auto">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QGoIcon className="h-7 w-7" />
                    </div>
                  </div>
                </div>

                {/* Particle effects */}
                <div class="pointer-events-none absolute inset-0">
                  <div class="bg-primary absolute top-12 right-12 h-1 w-1 animate-ping rounded-full"></div>
                  <div class="bg-secondary absolute bottom-16 left-16 h-1 w-1 animate-pulse rounded-full"></div>
                  <div
                    class="bg-accent absolute top-20 left-12 h-0.5 w-0.5 animate-ping rounded-full"
                    style="animation-delay: 1s"
                  ></div>
                  <div
                    class="bg-info absolute right-20 bottom-12 h-0.5 w-0.5 animate-pulse rounded-full"
                    style="animation-delay: 2s"
                  ></div>
                  <div
                    class="bg-primary absolute top-32 right-24 h-0.5 w-0.5 animate-ping rounded-full"
                    style="animation-delay: 1.5s"
                  ></div>
                  <div
                    class="bg-secondary absolute bottom-24 left-32 h-1 w-1 animate-pulse rounded-full"
                    style="animation-delay: 0.5s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div class="flex flex-col items-center gap-2">
            <span class="text-base-content/60 text-sm">Scroll to explore</span>
            <svg
              class="text-base-content/60 h-6 w-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section class="bg-base-100 py-20">
        <div class="container mx-auto px-4">
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-4xl font-bold">About Me</h2>
            <div class="bg-primary mx-auto h-1 w-20"></div>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div class="card bg-base-100 shadow-xl transition-transform hover:scale-105">
              <div class="card-body items-center text-center">
                <div class="bg-primary/20 mb-4 rounded-full p-4">
                  <svg
                    class="text-primary h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 class="card-title">Full Stack Developer</h3>
                <p class="text-base-content/70">
                  Building end-to-end solutions with modern web technologies and
                  best practices.
                </p>
              </div>
            </div>

            <div class="card bg-base-100 shadow-xl transition-transform hover:scale-105">
              <div class="card-body items-center text-center">
                <div class="bg-secondary/20 mb-4 rounded-full p-4">
                  <svg
                    class="text-secondary h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 class="card-title">Problem Solver</h3>
                <p class="text-base-content/70">
                  Passionate about finding elegant solutions to complex
                  technical challenges.
                </p>
              </div>
            </div>

            <div class="card bg-base-100 shadow-xl transition-transform hover:scale-105">
              <div class="card-body items-center text-center">
                <div class="bg-accent/20 mb-4 rounded-full p-4">
                  <svg
                    class="text-accent h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="card-title">Fast Learner</h3>
                <p class="text-base-content/70">
                  Always exploring new technologies and staying up-to-date with
                  industry trends.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <Link href="/about" class="btn btn-outline btn-lg">
              Learn More About Me
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
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section class="bg-base-200 py-20">
        <div class="container mx-auto px-4">
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-4xl font-bold">Skills & Technologies</h2>
            <div class="bg-primary mx-auto h-1 w-20"></div>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Frontend Technologies */}
            <div class="card bg-base-100 shadow-lg transition-transform hover:scale-105">
              <div class="card-body">
                <h3 class="card-title text-lg">Frontend</h3>
                <div class="flex flex-wrap gap-3">
                  <div class="tooltip" data-tip="React">
                    <QReactIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Vue.js">
                    <QVueIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Qwik">
                    <QQwikIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="TypeScript">
                    <QTypeScriptIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Tailwind CSS">
                    <QTailwindIcon size={32} />
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Technologies */}
            <div class="card bg-base-100 shadow-lg transition-transform hover:scale-105">
              <div class="card-body">
                <h3 class="card-title text-lg">Backend</h3>
                <div class="flex flex-wrap gap-3">
                  <div class="tooltip" data-tip="Node.js">
                    <QNodeIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Go">
                    <QGoIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Python">
                    <QPythonIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Deno">
                    <QDenoIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Bun">
                    <QBunIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Express">
                    <QExpressIcon size={32} />
                  </div>
                </div>
              </div>
            </div>

            {/* Database Technologies */}
            <div class="card bg-base-100 shadow-lg transition-transform hover:scale-105">
              <div class="card-body">
                <h3 class="card-title text-lg">Database</h3>
                <div class="flex flex-wrap gap-3">
                  <div class="tooltip" data-tip="PostgreSQL">
                    <QPostgreSQLIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="MongoDB">
                    <QMongoDBIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="MariaDB">
                    <QMariaDBIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Redis">
                    <QRedisIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Prisma">
                    <QPrismaIcon size={32} />
                  </div>
                </div>
              </div>
            </div>

            {/* DevOps & Tools */}
            <div class="card bg-base-100 shadow-lg transition-transform hover:scale-105">
              <div class="card-body">
                <h3 class="card-title text-lg">DevOps & Tools</h3>
                <div class="flex flex-wrap gap-3">
                  <div class="tooltip" data-tip="Docker">
                    <QDockerIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Git">
                    <QGitIcon size={32} />
                  </div>
                  <div class="tooltip" data-tip="Linux">
                    <QLinuxIcon size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
