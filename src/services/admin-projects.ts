import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "../lib/graphql/graffle-with-refresh";

/**
 * Admin Project Management Types
 */
export interface Project {
  id: string;
  title: string;
  description?: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  description?: string;
  userId?: string;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  userId?: string;
}

export interface ProjectListFilter {
  page?: number;
  pageSize?: number;
  userId?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface ProjectListResponse {
  data: Project[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all projects for admin
 */
export const getAllProjects = server$(
  async (
    token: string,
    filters: ProjectListFilter = {},
  ): Promise<ProjectListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetAllProjects(
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        projects(
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
          data {
            id
            title
            description
            userId
            user {
              id
              name
              email
            }
            createdAt
            updatedAt
          }
          pagination {
            page
            pageSize
            total
            totalPages
          }
        }
      }
    `.send({
        page: filters.page || 1,
        pageSize: filters.pageSize || 50,
        sortBy: filters.sortBy || "createdAt",
        sortDirection: filters.sortDirection || "DESC",
      });

      console.log(
        "🔍 Admin project list result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin project list errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch projects");
      }

      const projectData = result?.data?.projects || result?.projects;

      if (!projectData) {
        console.error("No project data in response:", result);
        throw new Error("Invalid project list response structure");
      }

      return projectData;
    } catch (error) {
      console.error("❌ Admin get all projects error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch projects",
      );
    }
  },
);

/**
 * Get projects by user
 */
export const getProjectsByUser = server$(
  async (
    token: string,
    userId: string,
    filters: ProjectListFilter = {},
  ): Promise<ProjectListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetProjectsByUser(
        $userId: ID!
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        projectsByUser(
          userId: $userId
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
          data {
            id
            title
            description
            userId
            user {
              id
              name
              email
            }
            createdAt
            updatedAt
          }
          pagination {
            page
            pageSize
            total
            totalPages
          }
        }
      }
    `.send({
        userId,
        page: filters.page || 1,
        pageSize: filters.pageSize || 50,
        sortBy: filters.sortBy || "createdAt",
        sortDirection: filters.sortDirection || "DESC",
      });

      console.log(
        "🔍 Admin projects by user result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin projects by user errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to fetch projects by user",
        );
      }

      const projectData =
        result?.data?.projectsByUser || result?.projectsByUser;

      if (!projectData) {
        console.error("No project data in response:", result);
        throw new Error("Invalid projects by user response structure");
      }

      return projectData;
    } catch (error) {
      console.error("❌ Admin get projects by user error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch projects by user",
      );
    }
  },
);

/**
 * Get single project by ID for admin
 */
export const getProjectById = server$(
  async (token: string, id: string): Promise<Project> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetProjectById($id: ID!) {
        project(id: $id) {
          id
          title
          description
          userId
          user {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `.send({ id });

      console.log(
        "🔍 Admin get project by ID result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin get project by ID errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch project");
      }

      const projectData = result?.data?.project || result?.project;

      if (!projectData) {
        throw new Error("Project not found");
      }

      return projectData;
    } catch (error) {
      console.error("❌ Admin get project by ID error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch project",
      );
    }
  },
);

/**
 * Create new project
 */
export const createProject = server$(
  async (token: string, projectData: CreateProjectInput): Promise<Project> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
          id
          title
          description
          userId
          user {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `.send({ input: projectData });

      console.log(
        "🔍 Admin create project result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin create project errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to create project");
      }

      const newProject = result?.data?.createProject || result?.createProject;

      if (!newProject) {
        console.error("No project data in create response:", result);
        throw new Error("Invalid create project response structure");
      }

      return newProject;
    } catch (error) {
      console.error("❌ Admin create project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
  },
);

/**
 * Update project
 */
export const updateProject = server$(
  async (
    token: string,
    projectData: UpdateProjectInput & { id: string },
  ): Promise<Project> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
        updateProject(id: $id, input: $input) {
          id
          title
          description
          userId
          user {
            id
            name
            email
          }
          createdAt
          updatedAt
        }
      }
    `.send({
        id: projectData.id,
        input: {
          title: projectData.title,
          description: projectData.description,
          userId: projectData.userId,
        },
      });

      console.log(
        "🔍 Admin update project result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update project errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to update project");
      }

      const updatedProject =
        result?.data?.updateProject || result?.updateProject;

      if (!updatedProject) {
        console.error("No project data in update response:", result);
        throw new Error("Invalid update project response structure");
      }

      return updatedProject;
    } catch (error) {
      console.error("❌ Admin update project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update project",
      );
    }
  },
);

/**
 * Delete project
 */
export const deleteProject = server$(
  async (token: string, id: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id)
      }
    `.send({ id });

      console.log(
        "🔍 Admin delete project result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin delete project errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to delete project");
      }

      const deleteResult = result?.data?.deleteProject || result?.deleteProject;
      return deleteResult || false;
    } catch (error) {
      console.error("❌ Admin delete project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete project",
      );
    }
  },
);

/**
 * Validate project data
 */
export const validateProjectData = (
  data: Partial<CreateProjectInput>,
): string[] => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Title is required");
  }

  return errors;
};
