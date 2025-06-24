import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ImgHisyam from "~/media/hisyam.jpg?jsx";
import {
  ReactIcon,
  VueIcon,
  TypeScriptIcon,
  NodeIcon,
  TailwindIcon,
  GitIcon,
} from "~/components/TechIcons/TechIcons";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

export default component$(() => {
  const nextSectionRef = useSignal<Element | undefined>(undefined);
  const { ref: heroRef } = useScrollAnimation();
  const skillsStaggerRef = useStaggerAnimation(150);

  const scrollToNextSection = $(() => {
    nextSectionRef.value?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="relative flex min-h-screen items-center justify-center overflow-hidden"
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

                <h2 class="text-base-content/80 text-2xl lg:text-3xl">
                  Full Stack Developer & Tech Enthusiast
                </h2>

                <p class="text-base-content/70 mx-auto max-w-2xl text-lg lg:mx-0">
                  Suka mencoba teknologi baru dan membangun solusi digital yang
                  inovatif. Passionate about creating seamless user experiences
                  and scalable applications.
                </p>

                <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <button
                    class="btn btn-primary btn-lg group hover-scale magnetic"
                    onClick$={scrollToNextSection}
                  >
                    Explore My Work
                    <svg
                      class="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1"
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
                  </button>

                  <Link
                    href="#contact"
                    class="btn btn-outline btn-lg hover-scale magnetic"
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
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Link>

                  <Link
                    href="https://linkedin.com/in/hisyam99"
                    target="_blank"
                    class="btn btn-ghost btn-circle hover:text-primary hover-scale animate-fadeInUp"
                    style="animation-delay: 0.8s"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>

                  <Link
                    href="mailto:hisyam@kamil.my.id"
                    class="btn btn-ghost btn-circle hover:text-primary hover-scale animate-fadeInUp"
                    style="animation-delay: 1s"
                  >
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z"
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
                      <ReactIcon />
                    </div>
                  </div>
                  <div class="absolute top-1/2 -right-8 -translate-y-1/2 transform">
                    <div class="bg-base-100 border-secondary/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      <TypeScriptIcon />
                    </div>
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
                    <div class="bg-base-100 border-accent/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      <NodeIcon />
                    </div>
                  </div>
                  <div class="absolute top-1/2 -left-8 -translate-y-1/2 transform">
                    <div class="bg-base-100 border-info/20 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg">
                      <TailwindIcon />
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
            class="text-base-content/50 h-6 w-6"
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
      <section ref={nextSectionRef} id="about" class="bg-base-200 py-20">
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
      <section id="skills" class="py-20">
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
                <h3 class="card-title text-primary mb-4">
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
                    <ReactIcon />
                    <span class="font-medium">React/Next.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <VueIcon />
                    <span class="font-medium">Vue.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.015-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.865.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.015 1.36-.034-.44.572-.895 1.095-1.36 1.565-.455-.47-.91-.993-1.36-1.565z" />
                    </svg>
                    <span class="font-medium">Qwik</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <TypeScriptIcon />
                    <span class="font-medium">TypeScript</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <TailwindIcon />
                    <span class="font-medium">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title text-primary mb-4">
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
                    <NodeIcon />
                    <span class="font-medium">Node.js</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.082l-.199.303c-.023.036-.082.048-.117.048H1.811zm-.199.756c-.047 0-.058-.024-.035-.059l.211-.315c.023-.035.081-.059.128-.059h4.49c.046 0 .058.024.058.059v.269c0 .035-.012.059-.058.059H1.612zm-.375.756c-.047 0-.058-.024-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.047 0 .059.023.059.058v.269c0 .035-.012.059-.059.059H1.436zm11.606-5.175c.59 0 .986.164 1.156.47l.07.117c.047.094.023.164-.035.188l-.305.094c-.059.023-.129 0-.152-.047-.105-.152-.223-.211-.375-.211-.211 0-.34.117-.34.293v.094c0 .176.129.293.34.293.152 0 .27-.059.375-.211.023-.047.094-.07.152-.047l.305.094c.058.024.082.094.035.188l-.07.117c-.17.306-.566.47-1.156.47-.669 0-1.098-.352-1.098-.856v-.094c0-.504.429-.856 1.098-.856zm3.199 0c.199 0 .375.035.527.105l.117.047c.07.035.105.094.082.164l-.094.188c-.035.07-.094.094-.164.059l-.117-.047c-.082-.035-.176-.059-.281-.059-.199 0-.328.117-.328.293v.094c0 .176.129.293.328.293.105 0 .199-.024.281-.059l.117-.047c.07-.035.129-.012.164.059l.094.188c.023.07-.012.129-.082.164l-.117.047c-.152.07-.328.105-.527.105-.645 0-1.062-.352-1.062-.856v-.094c0-.504.417-.856 1.062-.856zm2.098 0c.621 0 1.039.352 1.039.856v.094c0 .504-.418.856-1.039.856-.621 0-1.039-.352-1.039-.856v-.094c0-.504.418-.856 1.039-.856zm0 .34c-.211 0-.34.117-.34.293v.094c0 .176.129.293.34.293s.34-.117.34-.293v-.094c0-.176-.129-.293-.34-.293zm4.336-.34c.574 0 .973.329 .973.844v.094c0 .515-.399.844-.973.844h-.551v.129c0 .047-.023.059-.058.059h-.27c-.035 0-.058-.012-.058-.059V9.418c0-.047.023-.059.058-.059h.879zm-.035.34h-.492v.434h.492c.176 0 .293-.082.293-.217v-.082c0-.135-.117-.218-.293-.218zm3.68-.34c.469 0 .785.199.785.516v.047c0 .246-.175.375-.457.422.34.046.574.246.574.527v.047c0 .351-.34.586-.844.586h-.668c-.047 0-.07-.024-.07-.059V9.418c0-.035.023-.059.07-.059h.61zm-.363.34v.375h.457c.176 0 .281-.094.281-.211v-.035c0-.117-.105-.211-.281-.211h-.457zm.07 1.031h.539c.211 0 .328-.094.328-.234v-.047c0-.141-.117-.234-.328-.234h-.539v.515zm3.738-.691c.07 0 .105.035.105.094l.023.187c.012.07-.023.105-.082.117-.434.094-.844.398-.844.914v1.008c0 .047-.023.059-.058.059h-.27c-.035 0-.058-.012-.058-.059V11.07c0-.047.023-.059.058-.059h.27c.035 0 .058.012.058.059v.094c.152-.082.375-.164.621-.164.082 0 .164.012.258.023zm2.859-.105c.621 0 1.039.352 1.039.856v.094c0 .504-.418.856-1.039.856s-1.039-.352-1.039-.856v-.094c0-.504.418-.856 1.039-.856zm0 .34c-.211 0-.34.117-.34.293v.094c0 .176.129.293.34.293s.34-.117.34-.293v-.094c0-.176-.129-.293-.34-.293zm4.781-.34c.621 0 1.027.387 1.027.867v1.183c0 .047-.023.059-.058.059h-.27c-.035 0-.058-.012-.058-.059v-1.09c0-.222-.129-.339-.34-.339-.211 0-.34.117-.34.339v1.09c0 .047-.023.059-.058.059h-.27c-.035 0-.058-.012-.058-.059V11.07c0-.047.023-.059.058-.059h.27c.035 0 .058.012.058.059v.047c.152-.105.34-.152.539-.152z" />
                    </svg>
                    <span class="font-medium">Golang</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.58-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 14.62l-.73.04-.75.08-.74.14-.7.2-.65.26-.59.32-.51.4-.42.47-.33.54-.23.61-.13.68-.02.75.07.83.16.9.26.95.33.98.38.99.42.98.44.95.46.9.46.83.47.75.46.66.44.56.4.45.37.35.33.26.3.18.26.11.22.07.2.03.17.01.15-.01.14-.02.13-.03.12-.05.11-.06.09-.08.08-.09.06-.11.04-.12.03-.14.01-.15.01-.16-.01-.18-.02-.2-.04-.21-.05-.22-.07-.23-.09-.25-.1-.26-.12-.26-.14-.27-.15-.28-.16-.29-.18-.3-.19-.3-.2-.31-.22-.31-.23-.32-.24-.33-.25-.34-.26-.34-.27-.35-.28-.36-.29-.37-.3-.37-.31-.38-.32-.39-.33-.4-.34-.4-.35-.41-.36-.42-.37-.43-.38-.44-.39-.44-.4-.45-.41-.46-.42-.47-.43-.48-.44-.49-.45-.49-.46-.5-.47-.51-.48-.52-.49-.53-.5-.54-.51-.55-.52-.56-.53-.57-.54-.58-.55-.59-.56-.6-.57-.61-.58-.62-.59-.63-.6-.64-.61-.65-.62-.66-.63-.67-.64-.68-.65-.69-.66-.7-.67-.71-.68-.72-.69-.73-.7-.74-.71-.75-.72-.76-.73-.77-.74-.78-.75-.79-.76-.8-.77-.81-.78-.82-.79-.83-.8-.84-.81-.85-.82-.86-.83-.87-.84-.88-.85-.89-.86-.9-.87-.91-.88-.92-.89-.93-.9-.94-.91-.95-.92-.96-.93-.97-.94-.98-.95-.99-.96-1-.97-1.01-.98-1.02-.99-1.03-1-1.04-1.01-1.05-1.02-1.06-1.03-1.07-1.04-1.08-1.05-1.09-1.06-1.1-1.07-1.11-1.08-1.12-1.09-1.13-1.1-1.14-1.11-1.15-1.12-1.16-1.13-1.17-1.14-1.18-1.15-1.19-1.16-1.2-1.17-1.21-1.18-1.22-1.19-1.23-1.2-1.24-1.21-1.25-1.22-1.26-1.23-1.27-1.24-1.28-1.25-1.29-1.26-1.3-1.27-1.31-1.28-1.32-1.29-1.33-1.3-1.34-1.31-1.35-1.32-1.36-1.33-1.37-1.34-1.38-1.35-1.39-1.36-1.4-1.37-1.41-1.38-1.42-1.39-1.43-1.4-1.44-1.41-1.45-1.42-1.46-1.43-1.47-1.44-1.48-1.45-1.49-1.46-1.5-1.47-1.51-1.48-1.52-1.49-1.53-1.5-1.54-1.51-1.55-1.52-1.56-1.53-1.57-1.54-1.58-1.55-1.59-1.56-1.6-1.57-1.61-1.58-1.62-1.59-1.63-1.6-1.64-1.61-1.65-1.62-1.66-1.63-1.67-1.64-1.68-1.65-1.69-1.66-1.7-1.67-1.71-1.68-1.72-1.69-1.73-1.7-1.74-1.71-1.75-1.72-1.76-1.73-1.77-1.74-1.78-1.75-1.79-1.76-1.8-1.77-1.81-1.78-1.82-1.79-1.83-1.8-1.84-1.81-1.85-1.82-1.86-1.83-1.87-1.84-1.88-1.85-1.89-1.86-1.9-1.87-1.91-1.88-1.92-1.89-1.93-1.9-1.94-1.91-1.95-1.92-1.96-1.93-1.97-1.94-1.98-1.95-1.99-1.96-2-1.97-2.01-1.98-2.02-1.99-2.03-2-2.04-2.01-2.05-2.02-2.06-2.03-2.07-2.04-2.08-2.05-2.09-2.06-2.1-2.07-2.11-2.08-2.12-2.09-2.13-2.1-2.14-2.11-2.15-2.12-2.16-2.13-2.17-2.14-2.18-2.15-2.19-2.16-2.2-2.17-2.21-2.18-2.22-2.19-2.23-2.2-2.24-2.21-2.25-2.22-2.26-2.23-2.27-2.24-2.28-2.25-2.29-2.26-2.3-2.27-2.31-2.28-2.32-2.29-2.33-2.3-2.34-2.31-2.35-2.32-2.36-2.33-2.37-2.34-2.38-2.35-2.39-2.36-2.4-2.37-2.41-2.38-2.42-2.39-2.43-2.4-2.44-2.41-2.45-2.42-2.46-2.43-2.47-2.44-2.48-2.45-2.49-2.46-2.5-2.47-2.51-2.48-2.52-2.49-2.53-2.5-2.54-2.51-2.55-2.52-2.56-2.53-2.57-2.54-2.58-2.55-2.59-2.56-2.6-2.57-2.61-2.58-2.62-2.59-2.63-2.6-2.64-2.61-2.65-2.62-2.66-2.63-2.67-2.64-2.68-2.65-2.69-2.66-2.7-2.67-2.71-2.68-2.72-2.69-2.73-2.7-2.74-2.71-2.75-2.72-2.76-2.73-2.77-2.74-2.78-2.75-2.79-2.76-2.8-2.77-2.81-2.78-2.82-2.79-2.83-2.8-2.84-2.81-2.85-2.82-2.86-2.83-2.87-2.84-2.88-2.85-2.89-2.86-2.9-2.87-2.91-2.88-2.92-2.89-2.93-2.9-2.94-2.91-2.95-2.92-2.96-2.93-2.97-2.94-2.98-2.95-2.99-2.96-3-2.97-3.01-2.98-3.02-2.99-3.03-3-3.04-3.01-3.05-3.02-3.06-3.03-3.07-3.04-3.08-3.05-3.09-3.06-3.1-3.07-3.11-3.08-3.12-3.09-3.13-3.1-3.14-3.11-3.15-3.12-3.16-3.13-3.17-3.14-3.18-3.15-3.19-3.16-3.2-3.17-3.21-3.18-3.22-3.19-3.23-3.2-3.24-3.21-3.25-3.22-3.26-3.23-3.27-3.24-3.28-3.25-3.29-3.26-3.3-3.27-3.31-3.28-3.32-3.29-3.33-3.3-3.34-3.31-3.35-3.32-3.36-3.33-3.37-3.34-3.38-3.35-3.39-3.36-3.4-3.37-3.41-3.38-3.42-3.39-3.43-3.4-3.44-3.41-3.45-3.42-3.46-3.43-3.47-3.44-3.48-3.45-3.49-3.46-3.5-3.47-3.51-3.48-3.52-3.49-3.53-3.5-3.54-3.51-3.55-3.52-3.56-3.53-3.57-3.54-3.58-3.55-3.59-3.56-3.6-3.57-3.61-3.58-3.62-3.59-3.63-3.6-3.64-3.61-3.65-3.62-3.66-3.63-3.67-3.64-3.68-3.65-3.69-3.66-3.7-3.67-3.71-3.68-3.72-3.69-3.73-3.7-3.74-3.71-3.75-3.72-3.76-3.73-3.77-3.74-3.78-3.75-3.79-3.76-3.8-3.77-3.81-3.78-3.82-3.79-3.83-3.8-3.84-3.81-3.85-3.82-3.86-3.83-3.87-3.84-3.88-3.85-3.89-3.86-3.9-3.87-3.91-3.88-3.92-3.89-3.93-3.9-3.94-3.91-3.95-3.92-3.96-3.93-3.97-3.94-3.98-3.95-3.99-3.96-4-3.97v-4.24c0-.82.09-1.6.26-2.34.16-.73.41-1.42.74-2.06.33-.64.75-1.22 1.24-1.73.49-.51 1.06-.95 1.69-1.31.63-.36 1.33-.64 2.08-.83.75-.19 1.55-.29 2.39-.29 1.18 0 2.27.21 3.27.63 1 .42 1.89 1.01 2.66 1.77.77.76 1.37 1.66 1.79 2.71.42 1.05.63 2.21.63 3.48v.24c0 .82-.09 1.6-.26 2.34-.16.73-.41 1.42-.74 2.06-.33.64-.75 1.22-1.24 1.73-.49.51-1.06.95-1.69 1.31-.63.36-1.33.64-2.08.83-.75.19-1.55.29-2.39.29-1.18 0-2.27-.21-3.27-.63-1-.42-1.89-1.01-2.66-1.77-.77-.76-1.37-1.66-1.79-2.71-.42-1.05-.63-2.21-.63-3.48v-.24z" />
                    </svg>
                    <span class="font-medium">Python</span>
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      ></path>
                    </svg>
                    <span class="font-medium">REST APIs</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.9 0C4.9 0 0 4.9 0 10.9s4.9 10.9 10.9 10.9 10.9-4.9 10.9-10.9S16.9 0 10.9 0zM10.9 20.4c-5.2 0-9.5-4.3-9.5-9.5S5.7 1.4 10.9 1.4s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z" />
                      <path d="M15.8 7.7c-.4-.2-.8-.3-1.3-.3-1.2 0-2.2.7-2.8 1.7-.6-1-1.6-1.7-2.8-1.7-.5 0-.9.1-1.3.3l.4.8c.3-.1.6-.2.9-.2.8 0 1.5.5 1.9 1.3l.9 1.5.9-1.5c.4-.8 1.1-1.3 1.9-1.3.3 0 .6.1.9.2l.4-.8zm-4.9 5.8c-.4.8-1.1 1.3-1.9 1.3-.3 0-.6-.1-.9-.2l-.4.8c.4.2.8.3 1.3.3 1.2 0 2.2-.7 2.8-1.7.6 1 1.6 1.7 2.8 1.7.5 0 .9-.1 1.3-.3l-.4-.8c-.3.1-.6.2-.9.2-.8 0-1.5-.5-1.9-1.3l-.9-1.5-.9 1.5z" />
                    </svg>
                    <span class="font-medium">GraphQL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Database */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title text-primary mb-4">
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
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.111 5.441c-.294-2.556-2.274-3.9-5.941-4.038-.914-.034-2.021.051-3.136.138-1.5.118-3.058.24-4.403.332-1.346.092-2.485.157-3.142.203-2.621.184-4.025 1.264-4.212 3.235-.047.493-.072 1.024-.072 1.582 0 .447.017.921.051 1.422.118 1.739.357 3.789.675 5.799.636 4.024 1.48 7.684 2.378 10.311.448 1.313.905 2.353 1.344 3.071.22.359.424.625.597.787.086.081.158.138.212.17l.053.03c.011.007.019.012.024.015l.013.008c.006.003.01.006.013.008l.008.004c.002.001.003.002.004.002h.002l.001-.001.002-.001.003-.002.005-.004.01-.006.018-.012.034-.024c.067-.05.16-.127.276-.235.23-.216.538-.552.895-1.009.714-0.914 1.654-2.368 2.61-4.285 1.913-3.833 4.042-9.655 4.797-16.378.188-1.675.259-3.22.214-4.522z" />
                    </svg>
                    <span class="font-medium">PostgreSQL</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-.438 1.613-.11 2.376.116.265.227.49.227.49s-.227-.227-.284-.334c-.114-.226-.284-.45-.284-.676 0-.114.057-.227.171-.34-.341.057-.512.284-.739.568-.284.341-.568.682-.909 1.195-.057.113-.114.227-.171.341-.171.341-.342.682-.57.909-.341.341-.57.682-.797 1.023-.227.341-.455.682-.796 1.081-.341.398-.511.739-.625 1.194-.114.455-.114.909.113 1.366.284.568.625 1.023 1.08 1.381.284.227.568.455.911.682.57.341 1.139.568 1.709.909.568.341 1.195.739 1.535 1.307.171.284.227.625.057.909-.171.284-.455.455-.739.568-.284.113-.625.171-.909.284-.284.113-.568.227-.852.341l-.284.113c-.171.057-.341.171-.455.284-.114.113-.171.284-.171.455 0 .171.057.341.171.455.113.113.284.171.455.171h.057c.399-.057.740-.227 1.080-.398.568-.284 1.080-.625 1.648-.909.568-.284 1.195-.511 1.762-.909.284-.227.511-.511.683-.739.171-.284.284-.568.284-.909 0-.341-.113-.682-.284-.966-.398-.682-1.023-1.195-1.648-1.592-.284-.171-.568-.284-.852-.455-.284-.171-.568-.284-.739-.455-.171-.171-.284-.341-.284-.568 0-.171.057-.341.171-.455.171-.171.398-.284.625-.341.284-.057.568-.057.852-.171.284-.113.568-.227.797-.398.284-.171.511-.398.683-.625.171-.284.227-.625.171-.909-.057-.341-.227-.625-.455-.852-.284-.284-.625-.455-.909-.682-.568-.341-1.195-.682-1.762-1.023-.284-.171-.568-.341-.739-.568-.171-.227-.284-.455-.284-.739 0-.284.113-.568.284-.739.171-.171.398-.284.625-.341.341-.057.682-.057 1.023.057.568.171 1.08.455 1.592.739.284.171.568.341.909.455.341.113.682.171 1.023.171.341 0 .682-.057 1.023-.171.341-.113.682-.284.966-.511.284-.227.511-.511.625-.852.113-.341.113-.682 0-1.023-.171-.568-.455-1.08-.852-1.535-.398-.455-.909-.852-1.421-1.195-.284-.171-.568-.284-.852-.398-.284-.113-.568-.171-.852-.227-.284-.057-.568-.057-.852-.057-.284 0-.568.057-.852.171-.284.113-.568.284-.739.511-.171.227-.284.455-.284.739 0 .284.113.568.284.739.171.171.398.284.625.341.284.057.568.057.852.057.284 0 .568-.057.852-.171.284-.113.511-.284.683-.511.171-.227.227-.511.171-.795-.057-.284-.227-.511-.455-.682-.227-.171-.511-.284-.795-.341-.284-.057-.568-.057-.852 0-.284.057-.568.171-.739.341-.171.171-.284.398-.284.625 0 .227.113.455.284.625.171.171.398.227.625.227.227 0 .455-.057.625-.227.171-.171.227-.398.171-.625-.057-.227-.171-.398-.341-.511-.171-.113-.398-.171-.625-.171-.227 0-.455.057-.625.227-.171.171-.227.398-.171.625.057.227.171.398.341.511.171.113.398.171.625.171.227 0 .455-.057.625-.227.171-.171.227-.398.171-.625z" />
                    </svg>
                    <span class="font-medium">MongoDB</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.5 2.661l.54.997-1.562.845 1.562.845-.54.997L8.78 5.282l1.72-2.621zm2.161 2.843l.54.997-1.562.845 1.562.845-.54.997-1.72-1.063 1.72-2.621zm3.839 4.403c-.845 1.25-1.562 2.282-2.282 3.024.845-.234 1.562-.593 2.282-1.094l1.25-.938c.312-.234.624-.469.936-.735.313-.297.563-.563.75-.844.188-.28.313-.593.375-.906.063-.343.094-.687.063-1.031-.031-.375-.125-.781-.25-1.156-.125-.406-.281-.781-.469-1.125l-.75-1.406-.063-.094c-.063-.125-.094-.25-.094-.375s.031-.25.094-.375l.188-.281c.031-.063.031-.125.031-.188 0-.063-.031-.125-.094-.188l-.063-.094c-.188-.312-.375-.593-.563-.875l-.562-.875c-.188-.281-.375-.562-.594-.844-.187-.281-.375-.562-.562-.781-.188-.25-.407-.469-.625-.688-.25-.218-.5-.406-.781-.562-.25-.188-.531-.344-.813-.469-.312-.156-.625-.281-.937-.375-.375-.125-.75-.188-1.125-.25-.406-.031-.812-.031-1.219.031-.406.063-.812.188-1.156.375-.375.188-.719.438-1.031.719-.281.281-.531.593-.75.937-.187.344-.343.719-.437 1.094-.125.406-.188.812-.188 1.219 0 .406.063.812.188 1.156.125.375.281.719.5 1.031.218.313.469.594.75.844.281.25.594.469.906.656.344.188.719.344 1.094.469.406.125.812.188 1.25.188.406 0 .781-.063 1.156-.188.375-.125.719-.281 1.031-.469.313-.187.594-.406.844-.656.25-.25.469-.531.656-.844.188-.312.344-.656.438-1.031.125-.375.156-.781.156-1.156 0-.406-.031-.812-.125-1.219-.094-.406-.25-.781-.437-1.125-.188-.375-.407-.719-.657-1.031-.25-.313-.531-.594-.843-.844-.313-.25-.657-.469-1.032-.625-.375-.188-.781-.313-1.187-.375-.438-.094-.875-.125-1.313-.094-.437.031-.875.125-1.281.25-.437.125-.844.281-1.219.469-.406.188-.781.406-1.125.656l-.719.594c-.25.219-.469.438-.656.688-.219.25-.406.5-.563.781-.187.281-.343.563-.468.844-.125.281-.219.594-.281.906-.063.313-.094.625-.094.938 0 .281.031.563.094.844.063.281.156.531.25.781.125.25.25.469.406.688.156.218.313.406.5.594.188.187.406.343.625.469.25.125.5.219.781.281.281.063.563.094.844.063.313-.031.594-.094.875-.188.281-.094.531-.219.781-.375.25-.156.469-.344.656-.531.188-.188.344-.406.469-.625.125-.219.219-.469.281-.719.063-.25.094-.531.063-.781-.031-.281-.125-.531-.25-.781-.125-.25-.281-.469-.469-.656-.188-.188-.406-.344-.625-.469-.25-.125-.531-.188-.812-.188-.281 0-.563.063-.812.188-.281.125-.531.281-.75.469-.219.188-.406.406-.531.656-.125.25-.188.531-.156.812.031.281.125.531.25.75.125.219.281.406.469.531.188.125.406.188.625.188.219 0 .438-.063.625-.188.188-.125.344-.281.469-.469.125-.188.188-.406.188-.625 0-.219-.063-.438-.188-.625-.125-.188-.281-.344-.469-.469-.188-.125-.406-.188-.625-.188-.219 0-.438.063-.625.188-.188.125-.344.281-.469.469-.125.188-.188.406-.188.625 0 .219.063.438.188.625.125.188.281.344.469.469.188.125.406.188.625.188.219 0 .438-.063.625-.188.188-.125.344-.281.469-.469.125-.188.188-.406.188-.625 0-.219-.063-.438-.188-.625-.125-.188-.281-.344-.469-.469-.188-.125-.406-.188-.625-.188z" />
                    </svg>
                    <span class="font-medium">Redis</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.152l-.008-.01-.074.01zm-4.24 0c-.463.01-.863.128-1.22.333-.568.324-.863.78-.863 1.374 0 .496.267.913.8 1.24.427.267.854.4 1.24.534.32.107.534.214.667.32.107.094.154.214.154.333 0 .214-.1.374-.267.487-.214.147-.534.214-.934.214-.374 0-.667-.067-.854-.2-.187-.127-.267-.287-.24-.487h-.693c-.014.534.267.934.8 1.134.427.16.934.24 1.507.24.587 0 1.08-.107 1.454-.32.374-.214.574-.534.574-.96 0-.374-.154-.667-.467-.854-.24-.147-.574-.267-.994-.374-.32-.08-.534-.147-.654-.214-.107-.067-.154-.147-.154-.267 0-.147.067-.267.2-.347.134-.08.32-.12.574-.12.32 0 .574.067.734.2.16.134.24.294.24.494h.68c0-.534-.24-.934-.667-1.134-.334-.147-.734-.22-1.227-.22zm7.706.133c-.587 0-1.107.134-1.534.4-.427.267-.64.667-.64 1.2v.027c0 .533.213.933.64 1.2.427.267.947.4 1.534.4.587 0 1.107-.133 1.534-.4.427-.267.64-.667.64-1.2v-.027c0-.533-.213-.933-.64-1.2-.427-.266-.947-.4-1.534-.4zm0 .667c.32 0 .574.08.754.24.18.16.267.374.267.64v.027c0 .267-.087.48-.267.64-.18.16-.434.24-.754.24-.32 0-.574-.08-.754-.24-.18-.16-.267-.373-.267-.64v-.027c0-.266.087-.48.267-.64.18-.16.434-.24.754-.24z" />
                      <path d="M.335 17.499c-.095.003-.19.011-.284.024v.013h.013c.054.104.147.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.152l-.008-.01L.335 17.499zm7.706.133c-.587 0-1.107.134-1.534.4-.427.267-.64.667-.64 1.2v.027c0 .533.213.933.64 1.2.427.267.947.4 1.534.4.587 0 1.107-.133 1.534-.4.427-.267.64-.667.64-1.2v-.027c0-.533-.213-.933-.64-1.2-.427-.266-.947-.4-1.534-.4zm0 .667c.32 0 .574.08.754.24.18.16.267.374.267.64v.027c0 .267-.087.48-.267.64-.18.16-.434.24-.754.24-.32 0-.574-.08-.754-.24-.18-.16-.267-.373-.267-.64v-.027c0-.266.087-.48.267-.64.18-.16.434-.24.754-.24z" />
                    </svg>
                    <span class="font-medium">MySQL</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.807 18.285L13.553 4.95c-.594-1.012-1.539-1.012-2.132 0L3.167 18.285c-.594 1.012-.1 1.834 1.113 1.834h16.414c1.213 0 1.707-.822 1.113-1.834z" />
                    </svg>
                    <span class="font-medium">Prisma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div class="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div class="card-body">
                <h3 class="card-title text-primary mb-4">
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
                    <GitIcon />
                    <span class="font-medium">Git/GitHub</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m2.964 2.715h2.12a.185.185 0 00.184-.185v-1.888a.185.185 0 00-.184-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185v-1.888a.185.185 0 00-.184-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M24 0L0 5.562v12.876L24 24V0z" />
                    </svg>
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
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.504 0C5.6 0 0 5.6 0 12.504S5.6 25.008 12.504 25.008 25.008 19.408 25.008 12.504 19.408 0 12.504 0zM8.4 18.132c-2.772 0-4.74-1.848-4.74-4.632 0-1.716.72-3.168 1.884-4.02.396-.288.84-.444 1.296-.444.744 0 1.356.36 1.632.876.276.516.348 1.092.192 1.608-.156.516-.504.936-.936 1.176-.432.24-.936.36-1.44.36-.324 0-.636-.072-.924-.216.072.324.264.612.528.804.264.192.576.288.9.288.696 0 1.284-.372 1.596-.948.312-.576.336-1.236.072-1.848-.264-.612-.756-1.08-1.368-1.296-.612-.216-1.284-.204-1.872.036-.588.24-1.08.648-1.368 1.176-.288.528-.336 1.116-.132 1.668.204.552.6.996 1.104 1.236.504.24 1.08.264 1.62.072.54-.192.996-.552 1.272-1.008.276-.456.324-.984.132-1.464-.192-.48-.552-.864-1.008-1.08-.456-.216-.984-.264-1.464-.132-.48.132-.864.408-1.116.768-.252.36-.324.792-.204 1.188.12.396.36.744.684.984.324.24.732.372 1.152.372zm7.92-8.424c1.032 0 1.944.492 2.556 1.272.612.78.828 1.788.588 2.772-.24.984-.876 1.836-1.716 2.292-.84.456-1.836.516-2.748.168-.912-.348-1.668-1.044-2.016-1.908-.348-.864-.288-1.836.168-2.652.456-.816 1.212-1.416 2.088-1.656.876-.24 1.8-.132 2.628.24.828.372 1.5 1.008 1.836 1.8.336.792.336 1.668 0 2.46-.336.792-.936 1.464-1.668 1.908-.732.444-1.596.636-2.436.528-.84-.108-1.632-.48-2.232-1.044-.6-.564-.984-1.284-1.08-2.064-.096-.78.048-1.572.408-2.256.36-.684.9-1.248 1.548-1.62.648-.372 1.392-.516 2.136-.396.744.12 1.44.468 1.992.996.552.528.924 1.2 1.056 1.932.132.732.036 1.488-.276 2.172-.312.684-.792 1.272-1.392 1.68-.6.408-1.308.636-2.028.636-.72 0-1.404-.228-1.956-.636-.552-.408-.936-.972-1.068-1.596-.132-.624-.024-1.272.312-1.836.336-.564.828-.996 1.404-1.236.576-.24 1.212-.264 1.812-.072.6.192 1.128.564 1.464 1.056.336.492.432 1.068.276 1.596-.156.528-.48.984-.912 1.296-.432.312-.948.456-1.464.408-.516-.048-.984-.264-1.356-.612-.372-.348-.612-.792-.684-1.272-.072-.48.024-.972.276-1.38.252-.408.612-.732 1.032-.912.42-.18.888-.204 1.332-.072.444.132.84.384 1.116.732.276.348.408.768.372 1.176-.036.408-.216.792-.504 1.08-.288.288-.672.444-1.068.444-.396 0-.768-.156-1.032-.432-.264-.276-.396-.636-.372-.996.024-.36.18-.696.432-.924.252-.228.576-.348.912-.348.336 0 .648.12.876.336.228.216.348.504.336.804-.012.3-.144.588-.372.792-.228.204-.528.312-.84.312-.312 0-.6-.108-.816-.312-.216-.204-.336-.48-.336-.768 0-.288.12-.564.336-.768.216-.204.504-.312.816-.312z" />
                    </svg>
                    <span class="font-medium">Linux</span>
                  </div>
                  <div class="bg-base-100 hover:bg-primary/10 flex items-center gap-3 rounded-lg p-3 transition-colors">
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.895 15.947c-.845 0-1.532-.687-1.532-1.533s.687-1.533 1.532-1.533 1.533.687 1.533 1.533-.688 1.533-1.533 1.533zm1.905-7.264c-1.265.633-1.905 1.582-1.905 2.847v.633h-1.263v-.633c0-1.582.843-2.847 2.53-3.691 1.265-.633 1.896-1.582 1.896-2.847 0-1.265-.631-1.896-1.896-1.896s-1.905.631-1.905 1.896H9.2c0-1.9 1.265-3.164 3.164-3.164s3.164 1.265 3.164 3.164c0 1.582-.843 2.847-2.518 3.691z" />
                    </svg>
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
