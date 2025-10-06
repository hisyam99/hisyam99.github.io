import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "~/components/Breadcrumbs/useBreadcrumbs";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

export default component$(() => {
  const breadcrumbs = useBreadcrumbs();
  const { ref: heroRef } = useScrollAnimation();
  const { ref: statsRef } = useScrollAnimation();
  const { ref: bioRef } = useScrollAnimation();
  const skillsStaggerRef = useStaggerAnimation(100);
  const valuesStaggerRef = useStaggerAnimation(150);
  const activeTab = useSignal<string>("story");

  const handleTabChange = $((tab: string) => {
    activeTab.value = tab;
  });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="hero min-h-[60vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20"
      >
        <div class="hero-content flex-col lg:flex-row-reverse gap-12">
          <div class="avatar">
            <div class="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Developer"
                alt="Profile"
                width="256"
                height="256"
              />
            </div>
          </div>
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <p class="py-6 text-lg max-w-2xl">
              I'm a passionate full-stack developer who loves building modern
              web applications that make a difference. With expertise in
              cutting-edge technologies and a commitment to clean code, I bring
              ideas to life.
            </p>
            <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link href="/contact" class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Get In Touch
              </Link>
              <Link href="/resume" class="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Resume
              </Link>
              <Link href="/projects" class="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                My Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section class="bg-base-200 py-20">
        <div class="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <div class="mb-8">
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            class="stats stats-vertical lg:stats-horizontal shadow mb-12 w-full bg-base-100"
          >
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Years of Experience</div>
              <div class="stat-value text-primary">5+</div>
              <div class="stat-desc">Building amazing things</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Projects Completed</div>
              <div class="stat-value text-secondary">50+</div>
              <div class="stat-desc">Successful deliveries</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Technologies</div>
              <div class="stat-value text-accent">25+</div>
              <div class="stat-desc">Tools & frameworks</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Certifications</div>
              <div class="stat-value text-success">10+</div>
              <div class="stat-desc">Professional badges</div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div class="card bg-base-100 shadow-xl mb-12">
            <div class="card-body">
              {/* Tabs */}
              <div class="tabs tabs-boxed mb-6">
                <button
                  class={`tab ${activeTab.value === "story" ? "tab-active" : ""}`}
                  onClick$={() => handleTabChange("story")}
                >
                  My Story
                </button>
                <button
                  class={`tab ${activeTab.value === "approach" ? "tab-active" : ""}`}
                  onClick$={() => handleTabChange("approach")}
                >
                  My Approach
                </button>
                <button
                  class={`tab ${activeTab.value === "interests" ? "tab-active" : ""}`}
                  onClick$={() => handleTabChange("interests")}
                >
                  Interests
                </button>
              </div>

              {/* Tab Content */}
              {activeTab.value === "story" && (
                <div ref={bioRef} class="prose max-w-none">
                  <h3 class="text-2xl font-bold mb-4">My Journey</h3>
                  <p class="text-base-content/80 leading-relaxed mb-4">
                    My journey into software development began with a curiosity
                    about how things work. What started as tinkering with simple
                    HTML pages evolved into a deep passion for creating robust,
                    scalable applications that solve real-world problems.
                  </p>
                  <p class="text-base-content/80 leading-relaxed mb-4">
                    Over the years, I've had the privilege of working on diverse
                    projects - from small startups to enterprise applications.
                    Each project has taught me valuable lessons about code
                    quality, user experience, and the importance of continuous
                    learning in this ever-evolving field.
                  </p>
                  <p class="text-base-content/80 leading-relaxed">
                    Today, I specialize in full-stack development with a focus
                    on modern frameworks like Qwik, React, and Node.js. I'm
                    passionate about writing clean, maintainable code and
                    building applications that users love.
                  </p>
                </div>
              )}

              {activeTab.value === "approach" && (
                <div class="space-y-6">
                  <h3 class="text-2xl font-bold mb-4">How I Work</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="card bg-base-200">
                      <div class="card-body">
                        <h4 class="card-title text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          User-Centric Design
                        </h4>
                        <p class="text-sm">
                          I prioritize user experience in every decision,
                          ensuring applications are intuitive and accessible.
                        </p>
                      </div>
                    </div>

                    <div class="card bg-base-200">
                      <div class="card-body">
                        <h4 class="card-title text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                          Clean Code
                        </h4>
                        <p class="text-sm">
                          Writing maintainable, well-documented code is a
                          priority. Quality over quantity, always.
                        </p>
                      </div>
                    </div>

                    <div class="card bg-base-200">
                      <div class="card-body">
                        <h4 class="card-title text-accent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Performance First
                        </h4>
                        <p class="text-sm">
                          Optimizing for speed and efficiency ensures the best
                          possible experience for end users.
                        </p>
                      </div>
                    </div>

                    <div class="card bg-base-200">
                      <div class="card-body">
                        <h4 class="card-title text-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          Continuous Learning
                        </h4>
                        <p class="text-sm">
                          Technology evolves rapidly. I stay updated with the
                          latest trends and best practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab.value === "interests" && (
                <div class="space-y-6">
                  <h3 class="text-2xl font-bold mb-4">Beyond Coding</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="card bg-gradient-to-br from-primary/10 to-primary/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">🎮</div>
                        <h4 class="font-bold">Gaming</h4>
                        <p class="text-sm text-base-content/70">
                          Strategy games and problem-solving
                        </p>
                      </div>
                    </div>

                    <div class="card bg-gradient-to-br from-secondary/10 to-secondary/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">📚</div>
                        <h4 class="font-bold">Reading</h4>
                        <p class="text-sm text-base-content/70">
                          Tech blogs and sci-fi novels
                        </p>
                      </div>
                    </div>

                    <div class="card bg-gradient-to-br from-accent/10 to-accent/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">🎨</div>
                        <h4 class="font-bold">Design</h4>
                        <p class="text-sm text-base-content/70">
                          UI/UX and visual aesthetics
                        </p>
                      </div>
                    </div>

                    <div class="card bg-gradient-to-br from-info/10 to-info/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">🏃</div>
                        <h4 class="font-bold">Fitness</h4>
                        <p class="text-sm text-base-content/70">
                          Running and staying active
                        </p>
                      </div>
                    </div>

                    <div class="card bg-gradient-to-br from-success/10 to-success/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">☕</div>
                        <h4 class="font-bold">Coffee</h4>
                        <p class="text-sm text-base-content/70">
                          Enthusiast and amateur barista
                        </p>
                      </div>
                    </div>

                    <div class="card bg-gradient-to-br from-warning/10 to-warning/5">
                      <div class="card-body items-center text-center">
                        <div class="text-4xl mb-2">🎵</div>
                        <h4 class="font-bold">Music</h4>
                        <p class="text-sm text-base-content/70">
                          Coding soundtrack curator
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Core Values */}
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-center mb-8">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
            <div
              ref={valuesStaggerRef}
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div class="card-body items-center text-center">
                  <div class="bg-primary/10 rounded-full p-4 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 class="card-title">Integrity</h3>
                  <p class="text-sm text-base-content/70">
                    Honest, transparent communication and ethical practices in
                    all projects
                  </p>
                </div>
              </div>

              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div class="card-body items-center text-center">
                  <div class="bg-secondary/10 rounded-full p-4 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 class="card-title">Excellence</h3>
                  <p class="text-sm text-base-content/70">
                    Striving for the highest quality in every line of code and
                    design
                  </p>
                </div>
              </div>

              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div class="card-body items-center text-center">
                  <div class="bg-accent/10 rounded-full p-4 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 class="card-title">Collaboration</h3>
                  <p class="text-sm text-base-content/70">
                    Working together with teams to achieve extraordinary results
                  </p>
                </div>
              </div>

              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div class="card-body items-center text-center">
                  <div class="bg-info/10 rounded-full p-4 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-info"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 class="card-title">Innovation</h3>
                  <p class="text-sm text-base-content/70">
                    Embracing new technologies and creative solutions to
                    problems
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Showcase */}
          <div class="card bg-base-100 shadow-xl mb-12">
            <div class="card-body">
              <h2 class="card-title text-3xl mb-6">
                <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tech Stack & Tools
                </span>
              </h2>
              <div ref={skillsStaggerRef} class="space-y-6">
                {/* Frontend */}
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="badge badge-primary badge-lg">Frontend</div>
                    <h3 class="font-bold text-lg">User Interface</h3>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-lg badge-outline">React</div>
                    <div class="badge badge-lg badge-outline">Qwik</div>
                    <div class="badge badge-lg badge-outline">TypeScript</div>
                    <div class="badge badge-lg badge-outline">JavaScript</div>
                    <div class="badge badge-lg badge-outline">HTML5</div>
                    <div class="badge badge-lg badge-outline">CSS3</div>
                    <div class="badge badge-lg badge-outline">Tailwind CSS</div>
                    <div class="badge badge-lg badge-outline">DaisyUI</div>
                    <div class="badge badge-lg badge-outline">Sass</div>
                  </div>
                </div>

                <div class="divider"></div>

                {/* Backend */}
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="badge badge-secondary badge-lg">Backend</div>
                    <h3 class="font-bold text-lg">Server & APIs</h3>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-lg badge-outline">Node.js</div>
                    <div class="badge badge-lg badge-outline">Bun</div>
                    <div class="badge badge-lg badge-outline">GraphQL</div>
                    <div class="badge badge-lg badge-outline">REST API</div>
                    <div class="badge badge-lg badge-outline">PostgreSQL</div>
                    <div class="badge badge-lg badge-outline">MongoDB</div>
                    <div class="badge badge-lg badge-outline">Prisma</div>
                    <div class="badge badge-lg badge-outline">Express</div>
                  </div>
                </div>

                <div class="divider"></div>

                {/* Tools & DevOps */}
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <div class="badge badge-accent badge-lg">DevOps</div>
                    <h3 class="font-bold text-lg">Tools & Deployment</h3>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-lg badge-outline">Git</div>
                    <div class="badge badge-lg badge-outline">GitHub</div>
                    <div class="badge badge-lg badge-outline">Docker</div>
                    <div class="badge badge-lg badge-outline">CI/CD</div>
                    <div class="badge badge-lg badge-outline">Vercel</div>
                    <div class="badge badge-lg badge-outline">AWS</div>
                    <div class="badge badge-lg badge-outline">Linux</div>
                    <div class="badge badge-lg badge-outline">VS Code</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div class="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl">
            <div class="card-body items-center text-center py-12">
              <h2 class="card-title text-3xl mb-4">
                Let's Build Something Amazing Together
              </h2>
              <p class="mb-6 max-w-2xl">
                Whether you have a project in mind or just want to connect, I'd
                love to hear from you. Let's turn your ideas into reality!
              </p>
              <div class="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  class="btn btn-lg bg-base-100 text-primary hover:bg-base-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send Message
                </Link>
                <Link
                  href="/projects"
                  class="btn btn-lg btn-outline border-base-100 text-base-100 hover:bg-base-100 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "About Me - Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Learn more about me, my journey as a full-stack developer, my approach to building web applications, and the values that drive my work.",
    },
    {
      name: "keywords",
      content:
        "about, developer, full stack, web development, software engineer, biography, skills, experience",
    },
    {
      property: "og:title",
      content: "About Me - Full Stack Developer",
    },
    {
      property: "og:description",
      content:
        "Passionate full-stack developer building modern web applications with cutting-edge technologies.",
    },
    {
      property: "og:type",
      content: "profile",
    },
  ],
};
