import { routeLoader$ } from "@builder.io/qwik-city";
import {
  getPublishedBlogs,
  getBlogBySlug,
  getBlogById,
} from "../services/blog";
import { getProjects, getProjectById } from "../services/project";
import {
  getCategories,
  getCategoryById,
  getResumeContents,
  getResumeContentsByCategory,
  getResumeContentById,
} from "../services/category";
import { getCategoryById as getAdminCategoryById } from "../services/admin-categories";
import { getCurrentUser } from "../services/auth";
import { getUsers, getUserById } from "../services/user";
import type { PaginationInput } from "../lib/graphql/graffle";

/**
 * Blog Data Loaders
 */

/**
 * Load published blogs with pagination
 * Used on blog listing pages
 */
// eslint-disable-next-line qwik/loader-location
export const usePublishedBlogsLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
  const sortBy = url.searchParams.get("sortBy") || "publishedAt";
  const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getPublishedBlogs(pagination);
  } catch (error) {
    console.error("Failed to load published blogs:", error);
    throw new Error("Failed to load published blogs");
  }
});

/**
 * Load blog by slug
 * Used on individual blog post pages
 */
// eslint-disable-next-line qwik/loader-location
export const useBlogBySlugLoader = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;

  if (!slug) {
    throw new Error("Blog slug is required");
  }

  try {
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      requestEvent.status(404);
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.error("Failed to load blog by slug:", error);
    throw error;
  }
});

/**
 * Load blog by ID
 * Used on blog editing pages
 */
// eslint-disable-next-line qwik/loader-location
export const useBlogByIdLoader = routeLoader$(async (requestEvent) => {
  const id = requestEvent.params.id;

  if (!id) {
    throw new Error("Blog ID is required");
  }

  try {
    const blog = await getBlogById(id);

    if (!blog) {
      requestEvent.status(404);
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.error("Failed to load blog by ID:", error);
    throw error;
  }
});

/**
 * Project Data Loaders
 */

/**
 * Load all projects with pagination
 * Used on project listing pages
 */
// eslint-disable-next-line qwik/loader-location
export const useProjectsLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "12", 10);
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getProjects(pagination);
  } catch (error) {
    console.error("Failed to load projects:", error);
    throw new Error("Failed to load projects");
  }
});

/**
 * Load project by ID
 * Used on individual project pages
 */
// eslint-disable-next-line qwik/loader-location
export const useProjectByIdLoader = routeLoader$(async (requestEvent) => {
  const id = requestEvent.params.id;

  if (!id) {
    throw new Error("Project ID is required");
  }

  try {
    const project = await getProjectById(id);

    if (!project) {
      requestEvent.status(404);
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Failed to load project by ID:", error);
    throw error;
  }
});

/**
 * Category Data Loaders
 */

/**
 * Load all categories
 * Used for navigation and category listing
 */
// eslint-disable-next-line qwik/loader-location
export const useCategoriesLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "50", 10); // Get more categories by default
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortDirection = (url.searchParams.get("sortDirection") || "ASC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getCategories(pagination);
  } catch (error) {
    console.error("Failed to load categories:", error);
    throw new Error("Failed to load categories");
  }
});

/**
 * Load category by ID with its resume contents
 * Used on category detail pages
 */
// eslint-disable-next-line qwik/loader-location
export const useCategoryByIdLoader = routeLoader$(async (requestEvent) => {
  const id = requestEvent.params.id;

  if (!id) {
    throw new Error("Category ID is required");
  }

  try {
    const category = await getCategoryById(id);

    if (!category) {
      requestEvent.status(404);
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.error("Failed to load category by ID:", error);
    throw error;
  }
});

/**
 * Resume Content Data Loaders
 */

/**
 * Load all resume contents with pagination
 * Used on resume/CV pages
 */
// eslint-disable-next-line qwik/loader-location
export const useResumeContentsLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getResumeContents(pagination);
  } catch (error) {
    console.error("Failed to load resume contents:", error);
    throw new Error("Failed to load resume contents");
  }
});

/**
 * Load resume contents by category
 * Used when filtering resume content by category
 */
// eslint-disable-next-line qwik/loader-location
export const useResumeContentsByCategoryLoader = routeLoader$(
  async (requestEvent) => {
    const categoryId = requestEvent.params.categoryId;

    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const url = new URL(requestEvent.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
      | "ASC"
      | "DESC";

    const pagination: PaginationInput = {
      page,
      pageSize,
      sortBy,
      sortDirection,
    };

    try {
      return await getResumeContentsByCategory(categoryId, pagination);
    } catch (error) {
      console.error("Failed to load resume contents by category:", error);
      throw new Error("Failed to load resume contents by category");
    }
  },
);

/**
 * Authentication Data Loaders
 */

/**
 * Load current authenticated user
 * Used in protected routes and for displaying user info
 */
// eslint-disable-next-line qwik/loader-location
export const useCurrentUserLoader = routeLoader$(async (requestEvent) => {
  // Get token from cookies or headers
  const authHeader = requestEvent.request.headers.get("authorization");
  const tokenFromHeader = authHeader?.replace("Bearer ", "");

  // Try to get token from cookies as fallback
  const tokenFromCookie = requestEvent.cookie.get("access_token")?.value;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    // No token found, user is not authenticated
    return null;
  }

  try {
    return await getCurrentUser(token);
  } catch (error) {
    console.error("Failed to load current user:", error);
    // Don't throw error, just return null for unauthenticated state
    return null;
  }
});

/**
 * Combined Data Loaders
 */

/**
 * Load homepage data (featured blogs, projects, categories)
 * Used on the main homepage
 */
// eslint-disable-next-line qwik/loader-location
export const useHomepageDataLoader = routeLoader$(async () => {
  try {
    const [blogs, projects, categories] = await Promise.allSettled([
      getPublishedBlogs({
        page: 1,
        pageSize: 6,
        sortBy: "publishedAt",
        sortDirection: "DESC",
      }),
      getProjects({
        page: 1,
        pageSize: 6,
        sortBy: "createdAt",
        sortDirection: "DESC",
      }),
      getCategories({
        page: 1,
        pageSize: 10,
        sortBy: "name",
        sortDirection: "ASC",
      }),
    ]);

    return {
      featuredBlogs:
        blogs.status === "fulfilled"
          ? blogs.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 },
            },
      featuredProjects:
        projects.status === "fulfilled"
          ? projects.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 },
            },
      categories:
        categories.status === "fulfilled"
          ? categories.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
            },
    };
  } catch (error) {
    console.error("Failed to load homepage data:", error);
    // Return empty data structure instead of throwing
    return {
      featuredBlogs: {
        data: [],
        pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 },
      },
      featuredProjects: {
        data: [],
        pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 },
      },
      categories: {
        data: [],
        pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      },
    };
  }
});

/**
 * Load resume page data (categories with their contents)
 * Used on the resume/CV page
 */
// eslint-disable-next-line qwik/loader-location
export const useResumePageDataLoader = routeLoader$(async () => {
  try {
    const [categories, resumeContents] = await Promise.allSettled([
      getCategories({
        page: 1,
        pageSize: 20,
        sortBy: "name",
        sortDirection: "ASC",
      }),
      getResumeContents({
        page: 1,
        pageSize: 50,
        sortBy: "createdAt",
        sortDirection: "DESC",
      }),
    ]);

    return {
      categories:
        categories.status === "fulfilled"
          ? categories.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 },
            },
      resumeContents:
        resumeContents.status === "fulfilled"
          ? resumeContents.value
          : {
              data: [],
              pagination: { page: 1, pageSize: 50, total: 0, totalPages: 0 },
            },
    };
  } catch (error) {
    console.error("Failed to load resume page data:", error);
    return {
      categories: {
        data: [],
        pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 },
      },
      resumeContents: {
        data: [],
        pagination: { page: 1, pageSize: 50, total: 0, totalPages: 0 },
      },
    };
  }
});

/**
 * Admin Data Loaders
 */

/**
 * Load all users for admin (with pagination)
 * Used in admin user management pages
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminUsersLoader = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,

    sortDirection,
  };

  try {
    return await getUsers(token, pagination);
  } catch (error) {
    console.error("Failed to load admin users:", error);
    throw new Error("Failed to load users");
  }
});

/**
 * Load user by ID for admin edit
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminUserLoader = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;
  const userId = requestEvent.params.id;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  if (!userId) {
    throw requestEvent.redirect(302, "/admin/users");
  }

  try {
    const user = await getUserById(token, userId);
    return { user, error: null };
  } catch (error) {
    console.error("Failed to load user:", error);
    return { user: null, error: "Failed to load user" };
  }
});

/**
 * Load all categories for admin
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminCategoriesLoader = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortDirection = (url.searchParams.get("sortDirection") || "ASC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getCategories(pagination);
  } catch (error) {
    console.error("Failed to load admin categories:", error);
    throw new Error("Failed to load categories");
  }
});

/**
 * Load category by ID for admin edit
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminCategoryLoader = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;
  const categoryId = requestEvent.params.id;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  if (!categoryId) {
    throw requestEvent.redirect(302, "/admin/categories");
  }

  try {
    const category = await getAdminCategoryById(token, categoryId);
    return { category, error: null };
  } catch (error) {
    console.error("Failed to load category:", error);
    return { category: null, error: "Failed to load category" };
  }
});

/**
 * Load all resume contents for admin
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminResumeContentsLoader = routeLoader$(
  async (requestEvent) => {
    const url = new URL(requestEvent.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
      | "ASC"
      | "DESC";

    const pagination: PaginationInput = {
      page,
      pageSize,
      sortBy,
      sortDirection,
    };

    try {
      return await getResumeContents(pagination);
    } catch (error) {
      console.error("Failed to load admin resume contents:", error);
      throw new Error("Failed to load resume contents");
    }
  },
);

/**
 * Load resume content by ID for admin edit
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminResumeContentLoader = routeLoader$(
  async (requestEvent) => {
    const resumeContentId = requestEvent.params.id;

    if (!resumeContentId) {
      throw requestEvent.redirect(302, "/admin/resume-contents");
    }

    try {
      const resumeContent = await getResumeContentById(resumeContentId);
      return { resumeContent, error: null };
    } catch (error) {
      console.error("Failed to load resume content:", error);
      return { resumeContent: null, error: "Failed to load resume content" };
    }
  },
);

/**
 * Load all projects for admin
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminProjectsLoader = routeLoader$(async (requestEvent) => {
  const url = new URL(requestEvent.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const sortDirection = (url.searchParams.get("sortDirection") || "DESC") as
    | "ASC"
    | "DESC";

  const pagination: PaginationInput = {
    page,
    pageSize,
    sortBy,
    sortDirection,
  };

  try {
    return await getProjects(pagination);
  } catch (error) {
    console.error("Failed to load admin projects:", error);
    throw new Error("Failed to load projects");
  }
});

/**
 * Load project by ID for admin edit
 */
// eslint-disable-next-line qwik/loader-location
export const useAdminProjectLoader = routeLoader$(async (requestEvent) => {
  const projectId = requestEvent.params.id;

  if (!projectId) {
    throw requestEvent.redirect(302, "/admin/projects");
  }

  try {
    const project = await getProjectById(projectId);
    return { project, error: null };
  } catch (error) {
    console.error("Failed to load project:", error);
    return { project: null, error: "Failed to load project" };
  }
});
