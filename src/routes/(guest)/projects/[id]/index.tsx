import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { getProjectById } from "~/services/project";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import {
  useBreadcrumbs,
  mergeBreadcrumbs,
} from "~/components/Breadcrumbs/useBreadcrumbs";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

/**
 * Project detail page loader
 * Loads single project by ID
 */
export const useProjectDetailLoader = routeLoader$(async (requestEvent) => {
  const projectId = requestEvent.params.id;

  try {
    const project = await getProjectById(projectId);

    if (!project) {
      throw requestEvent.redirect(302, "/404");
    }

    return project;
  } catch (error) {
    console.error("Failed to load project:", error);
    throw requestEvent.redirect(302, "/404");
  }
});

export default component$(() => {
  const projectData = useProjectDetailLoader();
  const project = projectData.value;
  const autoBreadcrumbs = useBreadcrumbs();
  const { ref: heroRef } = useScrollAnimation();
  const { ref: contentRef } = useScrollAnimation();

  // Merge auto breadcrumbs with custom project title
  const breadcrumbs = mergeBreadcrumbs(autoBreadcrumbs, [
    { label: project.title, isActive: true },
  ]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="hero min-h-[50vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20"
      >
        <div class="hero-content text-center">
          <div class="max-w-4xl">
            <div class="mb-4">
              <Link href="/projects" class="btn btn-ghost btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Projects
              </Link>
            </div>
            <h1 class="mb-5 text-5xl font-bold">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            <div class="flex flex-wrap justify-center gap-2 mb-6">
              <div class="badge badge-primary badge-lg">Featured</div>
              <div class="badge badge-secondary badge-lg">Live Project</div>
            </div>
            <p class="text-lg text-base-content/70">
              Created on{" "}
              {new Date(project.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section class="bg-base-200 py-20">
        <div class="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumbs */}
          <div class="mb-8">
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          {/* Main Content Card */}
          <div ref={contentRef} class="card bg-base-100 shadow-xl mb-8">
            <div class="card-body">
              {/* Project Info */}
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2">
                  <h2 class="text-2xl font-bold mb-4">About This Project</h2>
                  <div class="prose max-w-none">
                    <p class="text-base-content/80 leading-relaxed">
                      {project.description ||
                        "This project demonstrates various technologies and best practices in modern web development. It showcases problem-solving skills and attention to detail."}
                    </p>
                  </div>
                </div>

                <div class="space-y-6">
                  {/* Project Stats */}
                  <div class="stats stats-vertical shadow w-full">
                    <div class="stat">
                      <div class="stat-title">Status</div>
                      <div class="stat-value text-success text-2xl">Active</div>
                      <div class="stat-desc">Live & Maintained</div>
                    </div>

                    <div class="stat">
                      <div class="stat-title">Last Updated</div>
                      <div class="stat-value text-2xl">
                        {new Date(project.updatedAt).toLocaleDateString(
                          "id-ID",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <div class="stat-desc">
                        {new Date(project.updatedAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  {project.user && (
                    <div class="card bg-base-200">
                      <div class="card-body">
                        <h3 class="card-title text-base">Project Creator</h3>
                        <div class="flex items-center gap-3">
                          <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-12">
                              <span class="text-xl">
                                {project.user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p class="font-semibold">{project.user.name}</p>
                            <p class="text-sm text-base-content/70">
                              {project.user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div class="divider"></div>

              {/* Technologies Used */}
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Technologies Used</h2>
                <div class="flex flex-wrap gap-2">
                  <div class="badge badge-lg badge-primary">Qwik</div>
                  <div class="badge badge-lg badge-secondary">TypeScript</div>
                  <div class="badge badge-lg badge-accent">GraphQL</div>
                  <div class="badge badge-lg badge-info">DaisyUI</div>
                  <div class="badge badge-lg badge-success">Tailwind CSS</div>
                  <div class="badge badge-lg">PostgreSQL</div>
                  <div class="badge badge-lg">Docker</div>
                  <div class="badge badge-lg">Git</div>
                </div>
              </div>

              <div class="divider"></div>

              {/* Key Features */}
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Key Features</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-start gap-3">
                    <div class="badge badge-primary badge-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold">Responsive Design</h3>
                      <p class="text-sm text-base-content/70">
                        Works seamlessly across all devices
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <div class="badge badge-secondary badge-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold">Fast Performance</h3>
                      <p class="text-sm text-base-content/70">
                        Optimized for speed and efficiency
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <div class="badge badge-accent badge-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold">Modern UI/UX</h3>
                      <p class="text-sm text-base-content/70">
                        Clean and intuitive user interface
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <div class="badge badge-info badge-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold">SEO Optimized</h3>
                      <p class="text-sm text-base-content/70">
                        Built with search engines in mind
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="divider"></div>

              {/* Action Buttons */}
              <div class="flex flex-wrap gap-4 justify-center">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Live Demo
                </button>
                <button class="btn btn-secondary btn-lg">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  View Source Code
                </button>
                <button class="btn btn-outline btn-lg">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share Project
                </button>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div class="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 class="font-bold">Interested in more projects?</h3>
              <div class="text-xs">
                Check out my other work in the projects section
              </div>
            </div>
            <Link href="/projects" class="btn btn-sm">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const project = resolveValue(useProjectDetailLoader);
  return {
    title: `${project.title} - Project Details`,
    meta: [
      {
        name: "description",
        content:
          project.description ||
          "Detailed information about this project, technologies used, and key features.",
      },
      {
        name: "keywords",
        content: `${project.title}, project, portfolio, web development`,
      },
      {
        property: "og:title",
        content: `${project.title} - Project Details`,
      },
      {
        property: "og:description",
        content: project.description || "Explore this project in detail.",
      },
      {
        property: "og:type",
        content: "article",
      },
    ],
  };
};
