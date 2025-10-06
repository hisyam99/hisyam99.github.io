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
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

export default component$(() => {
  const { ref: heroRef } = useScrollAnimation();
  const skillsStaggerRef = useStaggerAnimation(150);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 md:pt-24"
      >
        {/* Animated background */}
        <div class="absolute inset-0 -z-10">
          <div class="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-br via-transparent"></div>
          <div class="bg-primary/30 absolute top-0 left-0 h-72 w-72 animate-pulse rounded-full blur-3xl"></div>
          <div class="bg-secondary/30 absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full blur-3xl"></div>
        </div>

        <div class="container mx-auto px-4 py-20">
          <div class="flex flex-col items-center justify-between gap-12 lg:flex-row">
            {/* Text Content */}
            <div
              class="animate-fadeInLeft flex-1 text-center lg:text-left"
              style="animation-delay: 0.2s"
            >
              <div class="space-y-6">
                <div class="inline-block">
                  <span class="badge badge-primary badge-lg animate-pulse">
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
                  <Link
                    href="/projects"
                    class="btn btn-primary btn-lg group hover-scale magnetic"
                  >
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

                  <Link
                    href="/about"
                    class="btn btn-secondary btn-lg hover-scale magnetic"
                  >
                    About Me
                  </Link>

                  <Link
                    href="/resume"
                    class="btn btn-outline btn-lg hover-scale magnetic"
                  >
                    View Resume
                  </Link>

                  <Link
                    href="/contact"
                    class="btn btn-accent btn-lg hover-scale magnetic"
                  >
                    Get In Touch
                  </Link>
                </div>

                {/* Social Links */}
                <div class="flex justify-center gap-4 pt-4 lg:justify-start">
                  <Link
                    href="https://github.com/hisyam99"
                    target="_blank"
                    class="btn btn-ghost btn-circle hover:text-primary hover-scale animate-fadeInUp"
                    style="animation-delay: 0.6s"
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
                    class="btn btn-ghost btn-circle hover:text-primary hover-scale animate-fadeInUp"
                    style="animation-delay: 0.8s"
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
                    class="btn btn-ghost btn-circle hover:text-primary hover-scale animate-fadeInUp"
                    style="animation-delay: 1s"
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
            <div
              class="animate-fadeInRight flex flex-1 justify-center lg:justify-end"
              style="animation-delay: 0.4s"
            >
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

                    {/* Main photo with hexagonal clip */}
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

                {/* Orbiting tech icons */}
                <div class="animate-spin-slow absolute inset-0">
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 transform">
                    <div class="bg-base-100 border-primary/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QQwikIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div class="absolute top-1/2 -right-8 -translate-y-1/2 transform">
                    <div class="bg-base-100 border-secondary/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QTypeScriptIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
                    <div class="bg-base-100 border-accent/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QLinuxIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div class="absolute top-1/2 -left-8 -translate-y-1/2 transform">
                    <div class="bg-base-100 border-info/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      {/* eslint-disable-next-line qwik/no-react-props */}
                      <QDenoIcon className="h-6 w-6" />
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          class="animate-bounce-slow absolute bottom-8 left-1/2 -translate-x-1/2"
          style="animation-delay: 1s"
        >
          <svg
            class="text-content-quaternary h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="bg-base-200 py-20 pt-32">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">About Me</h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.5s"
            ></div>
          </div>

          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div class="space-y-6">
              <p class="text-lg leading-relaxed">
                I'm a passionate Full Stack Developer based in Indonesia with a
                strong interest in building innovative digital solutions. My
                journey in tech started with curiosity and has grown into a
                career focused on creating impactful applications.
              </p>

              <p class="text-lg leading-relaxed">
                I specialize in modern web technologies and enjoy working with
                both frontend and backend systems. From designing intuitive user
                interfaces to architecting scalable server solutions, I love
                every aspect of the development process.
              </p>

              <div class="grid grid-cols-2 gap-4 pt-4">
                <div
                  class="card bg-base-100 hover-lift animate-scaleInCenter shadow-xl"
                  style="animation-delay: 0.8s"
                >
                  <div class="card-body">
                    <h3 class="card-title text-primary animate-heartbeat">
                      3+
                    </h3>
                    <p>Years of Experience</p>
                  </div>
                </div>
                <div
                  class="card bg-base-100 hover-lift animate-scaleInCenter shadow-xl"
                  style="animation-delay: 1s"
                >
                  <div class="card-body">
                    <h3 class="card-title text-primary animate-heartbeat">
                      20+
                    </h3>
                    <p>Projects Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
                  <div class="card-body">
                    <div class="text-primary mb-2 text-3xl">📍</div>
                    <h3 class="font-semibold">Location</h3>
                    <p class="text-sm">Indonesia</p>
                  </div>
                </div>
                <div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
                  <div class="card-body">
                    <div class="text-primary mb-2 text-3xl">💼</div>
                    <h3 class="font-semibold">Currently</h3>
                    <p class="text-sm">Open for opportunities</p>
                  </div>
                </div>
              </div>
              <div class="mt-8 space-y-4">
                <div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
                  <div class="card-body">
                    <div class="text-primary mb-2 text-3xl">🎓</div>
                    <h3 class="font-semibold">Education</h3>
                    <p class="text-sm">Computer Science</p>
                  </div>
                </div>
                <div class="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
                  <div class="card-body">
                    <div class="text-primary mb-2 text-3xl">⚡</div>
                    <h3 class="font-semibold">Tech Stack</h3>
                    <p class="text-sm">Full Stack Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" class="py-20 pt-32">
        <div class="container mx-auto px-4">
          <div class="animate-fadeInDown mb-12 text-center">
            <h2 class="animate-textReveal mb-4 text-4xl font-bold">
              Skills & Technologies
            </h2>
            <div
              class="bg-primary animate-scaleInCenter mx-auto h-1 w-20"
              style="animation-delay: 0.3s"
            ></div>
          </div>

          <div
            ref={skillsStaggerRef}
            class="stagger-container grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Frontend */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title card-title-contrast mb-4">
                  <svg
                    class="h-6 w-6"
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
                  Frontend
                </h3>
                <div class="space-y-3">
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QReactIcon className="h-6 w-6" />
                    <span class="font-medium">React/Next.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QVueIcon className="h-6 w-6" />
                    <span class="font-medium">Vue.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QQwikIcon className="h-6 w-6" />
                    <span class="font-medium">Qwik</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QTypeScriptIcon className="h-6 w-6" />
                    <span class="font-medium">TypeScript</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QTailwindIcon className="h-6 w-6" />
                    <span class="font-medium">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title card-title-contrast mb-4">
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    ></path>
                  </svg>
                  Backend
                </h3>
                <div class="space-y-3">
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QNodeIcon className="h-6 w-6" />
                    <span class="font-medium">Node.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QGoIcon className="h-6 w-6" />
                    <span class="font-medium">Golang</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QPythonIcon className="h-6 w-6" />
                    <span class="font-medium">Python</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QDenoIcon className="h-6 w-6" />
                    <span class="font-medium">Deno</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QExpressIcon className="h-6 w-6" />
                    <span class="font-medium">Express.js</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Database */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title card-title-contrast mb-4">
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    ></path>
                  </svg>
                  Database
                </h3>
                <div class="space-y-3">
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QPostgreSQLIcon className="h-6 w-6" />
                    <span class="font-medium">PostgreSQL</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QMongoDBIcon className="h-6 w-6" />
                    <span class="font-medium">MongoDB</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QRedisIcon className="h-6 w-6" />
                    <span class="font-medium">Redis</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QMariaDBIcon className="h-6 w-6" />
                    <span class="font-medium">MySQL</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QPrismaIcon className="h-6 w-6" />
                    <span class="font-medium">Prisma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title card-title-contrast mb-4">
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Tools & Others
                </h3>
                <div class="space-y-3">
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QGitIcon className="h-6 w-6" />
                    <span class="font-medium">Git/GitHub</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QDockerIcon className="h-6 w-6" />
                    <span class="font-medium">Docker</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    <span class="font-medium">CI/CD</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QLinuxIcon className="h-6 w-6" />
                    <span class="font-medium">Linux</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    {/* eslint-disable-next-line qwik/no-react-props */}
                    <QBunIcon className="h-6 w-6" />
                    <span class="font-medium">Bun</span>
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
