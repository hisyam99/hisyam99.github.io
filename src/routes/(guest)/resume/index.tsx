import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import {
  getResumeContentsByCategories,
  type ResumeContentsByCategory,
} from "~/services/resume";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "~/components/Breadcrumbs/useBreadcrumbs";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

/**
 * Resume page loader
 * Loads all resume contents grouped by categories
 */
export const useResumeLoader = routeLoader$(async () => {
  try {
    const resumeData = await getResumeContentsByCategories();
    return resumeData;
  } catch (error) {
    console.error("Failed to load resume data:", error);
    return [];
  }
});

export default component$(() => {
  const resumeData = useResumeLoader();
  const breadcrumbs = useBreadcrumbs();
  const { ref: heroRef } = useScrollAnimation();
  const { ref: statsRef } = useScrollAnimation();
  const contentStaggerRef = useStaggerAnimation(200);
  const selectedCategory = useSignal<string>("all");

  const resumeCategories = resumeData.value;
  const totalContents = resumeCategories.reduce(
    (sum, cat) => sum + cat.contents.length,
    0,
  );

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="hero min-h-[50vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20"
      >
        <div class="hero-content text-center">
          <div class="max-w-4xl">
            <h1 class="mb-5 text-5xl font-bold">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Resume
              </span>
            </h1>
            <p class="mb-8 text-lg">
              A comprehensive overview of my professional journey, skills,
              education, and achievements. Explore my experience and expertise
              across different domains.
            </p>
            <div class="flex flex-wrap justify-center gap-3">
              <button class="btn btn-primary btn-lg">
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </button>
              <Link href="/contact" class="btn btn-outline btn-lg">
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
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Content */}
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Total Sections</div>
              <div class="stat-value text-primary">{totalContents}</div>
              <div class="stat-desc">Resume entries</div>
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Categories</div>
              <div class="stat-value text-secondary">
                {resumeCategories.length}
              </div>
              <div class="stat-desc">Different areas</div>
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Experience</div>
              <div class="stat-value text-accent">5+</div>
              <div class="stat-desc">Years in tech</div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          {resumeCategories.length > 0 && (
            <div class="tabs tabs-boxed mb-8 bg-base-100 shadow-lg p-2 flex-wrap justify-center">
              <button
                class={`tab ${selectedCategory.value === "all" ? "tab-active" : ""}`}
                onClick$={() => (selectedCategory.value = "all")}
              >
                All Sections
              </button>
              {resumeCategories.map((category) => (
                <button
                  key={category.categoryId}
                  class={`tab ${selectedCategory.value === category.categoryId ? "tab-active" : ""}`}
                  onClick$={() =>
                    (selectedCategory.value = category.categoryId)
                  }
                >
                  {category.categoryName}
                  <div class="badge badge-sm ml-2">
                    {category.contents.length}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Resume Content */}
          {resumeCategories.length === 0 ? (
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body items-center text-center py-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-24 w-24 text-base-content/20"
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
                <h3 class="text-2xl font-bold mt-4">Resume Coming Soon</h3>
                <p class="text-base-content/70 mt-2">
                  My detailed resume will be available here soon. Check back
                  later!
                </p>
              </div>
            </div>
          ) : (
            <div ref={contentStaggerRef} class="space-y-12">
              {resumeCategories
                .filter(
                  (cat) =>
                    selectedCategory.value === "all" ||
                    selectedCategory.value === cat.categoryId,
                )
                .map((category: ResumeContentsByCategory) => (
                  <div
                    key={category.categoryId}
                    class="card bg-base-100 shadow-xl"
                  >
                    <div class="card-body">
                      {/* Category Header */}
                      <div class="flex items-center justify-between mb-6">
                        <h2 class="card-title text-3xl">
                          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {category.categoryName}
                          </span>
                        </h2>
                        <div class="badge badge-primary badge-lg">
                          {category.contents.length}{" "}
                          {category.contents.length === 1 ? "item" : "items"}
                        </div>
                      </div>

                      {/* Timeline */}
                      <ul class="timeline timeline-vertical timeline-snap-icon">
                        {category.contents.map((content, index) => (
                          <li key={content.id}>
                            {index !== 0 && <hr class="bg-primary" />}
                            <div class="timeline-middle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="h-5 w-5 text-primary"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <div
                              class={`${
                                index % 2 === 0
                                  ? "timeline-start md:text-end"
                                  : "timeline-end"
                              } mb-10`}
                            >
                              <time class="font-mono italic text-sm opacity-70">
                                {new Date(content.createdAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  },
                                )}
                              </time>
                              <div class="text-lg font-black mt-1">
                                {content.title}
                              </div>
                              {content.description && (
                                <p class="text-base-content/80 mt-2">
                                  {content.description}
                                </p>
                              )}
                              {content.detail && (
                                <div class="collapse collapse-arrow bg-base-200 mt-3">
                                  <input type="checkbox" />
                                  <div class="collapse-title text-sm font-medium">
                                    View Details
                                  </div>
                                  <div class="collapse-content">
                                    <p class="text-sm whitespace-pre-line">
                                      {content.detail}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {index !== category.contents.length - 1 && (
                              <hr class="bg-primary" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Skills Showcase (Static for now) */}
          <div class="card bg-base-100 shadow-xl mt-12">
            <div class="card-body">
              <h2 class="card-title text-3xl mb-6">
                <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Skills & Technologies
                </span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Frontend */}
                <div>
                  <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                    <div class="badge badge-primary">Frontend</div>
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-outline">React</div>
                    <div class="badge badge-outline">Qwik</div>
                    <div class="badge badge-outline">TypeScript</div>
                    <div class="badge badge-outline">Tailwind CSS</div>
                    <div class="badge badge-outline">DaisyUI</div>
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                    <div class="badge badge-secondary">Backend</div>
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-outline">Node.js</div>
                    <div class="badge badge-outline">GraphQL</div>
                    <div class="badge badge-outline">PostgreSQL</div>
                    <div class="badge badge-outline">Prisma</div>
                    <div class="badge badge-outline">REST API</div>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                    <div class="badge badge-accent">Tools & Others</div>
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <div class="badge badge-outline">Git</div>
                    <div class="badge badge-outline">Docker</div>
                    <div class="badge badge-outline">VS Code</div>
                    <div class="badge badge-outline">Figma</div>
                    <div class="badge badge-outline">Bun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div class="alert alert-success mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 class="font-bold">Interested in working together?</h3>
              <div class="text-xs">
                Let's discuss how I can help bring your project to life
              </div>
            </div>
            <Link href="/contact" class="btn btn-sm">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Resume - Professional Experience & Skills",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive resume showcasing professional experience, skills, education, and achievements in web development and software engineering.",
    },
    {
      name: "keywords",
      content:
        "resume, CV, experience, skills, education, web development, full stack developer, software engineer",
    },
    {
      property: "og:title",
      content: "Resume - Professional Experience & Skills",
    },
    {
      property: "og:description",
      content:
        "Explore my professional journey, technical skills, and achievements.",
    },
    {
      property: "og:type",
      content: "profile",
    },
  ],
};
