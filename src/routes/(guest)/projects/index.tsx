import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { getProjects, type Project } from "~/services/project";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "~/components/Breadcrumbs/useBreadcrumbs";
import { Pagination } from "~/components/Pagination/Pagination";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimation";

/**
 * Projects listing page loader
 * Loads projects with pagination support
 */
export const useProjectsLoader = routeLoader$(async (requestEvent) => {
  const url = requestEvent.url;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 9; // 3x3 grid

  try {
    const projectsData = await getProjects({
      page,
      pageSize,
      sortBy: "createdAt",
      sortDirection: "DESC",
    });

    return projectsData;
  } catch (error) {
    console.error("Failed to load projects:", error);
    return {
      data: [],
      pagination: { page: 1, pageSize, total: 0, totalPages: 0 },
    };
  }
});

export default component$(() => {
  const projectsData = useProjectsLoader();
  const { data: projects, pagination } = projectsData.value;
  const breadcrumbs = useBreadcrumbs();
  const projectsStaggerRef = useStaggerAnimation(150);
  const { ref: heroRef } = useScrollAnimation();

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pt-32 pb-20"
      >
        <div class="hero-content text-center">
          <div class="max-w-3xl">
            <h1 class="mb-5 text-5xl font-bold">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>
            <p class="mb-8 text-lg">
              Explore my portfolio of web applications, tools, and creative
              projects. Each project showcases different technologies and
              problem-solving approaches.
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              <div class="badge badge-primary badge-lg">Full Stack</div>
              <div class="badge badge-secondary badge-lg">Frontend</div>
              <div class="badge badge-accent badge-lg">Backend</div>
              <div class="badge badge-info badge-lg">UI/UX</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Content */}
      <section class="bg-base-200 py-20">
        <div class="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div class="mb-8">
            <Breadcrumbs items={breadcrumbs} size="sm" />
          </div>

          {/* Stats */}
          <div class="stats stats-vertical lg:stats-horizontal shadow mb-12 w-full bg-base-100">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div class="stat-title">Total Projects</div>
              <div class="stat-value text-primary">{pagination.total}</div>
              <div class="stat-desc">Showcasing my work</div>
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
              <div class="stat-title">Technologies</div>
              <div class="stat-value text-secondary">20+</div>
              <div class="stat-desc">Different tech stacks</div>
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
              <div class="stat-value text-accent">3+</div>
              <div class="stat-desc">Years of development</div>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 class="text-2xl font-bold mt-4">No Projects Yet</h3>
                <p class="text-base-content/70 mt-2">
                  Projects will appear here soon. Check back later!
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={projectsStaggerRef}
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project: Project) => (
                <div
                  key={project.id}
                  class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div class="card-body">
                    <h2 class="card-title">
                      {project.title}
                      <div class="badge badge-secondary badge-sm">NEW</div>
                    </h2>
                    <p class="text-base-content/70 line-clamp-3">
                      {project.description || "No description available"}
                    </p>
                    <div class="card-actions justify-between items-center mt-4">
                      <div class="text-xs text-base-content/50">
                        {new Date(project.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        class="btn btn-primary btn-sm"
                      >
                        View Details
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div class="mt-12 flex justify-center">
              <Pagination
                pagination={pagination}
                baseUrl="/projects"
                size="md"
                variant="outline"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Projects - My Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Explore my portfolio of web applications, tools, and creative projects showcasing different technologies and problem-solving approaches.",
    },
    {
      name: "keywords",
      content:
        "projects, portfolio, web development, full stack, frontend, backend, UI/UX",
    },
    {
      property: "og:title",
      content: "Projects - My Portfolio",
    },
    {
      property: "og:description",
      content:
        "Explore my portfolio of web applications and creative projects.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};
