import { server$ } from "@builder.io/qwik-city";
import {
  createGraphQLClient,
  createAuthenticatedClient,
  type PaginationInput,
  type PaginatedResponse,
} from "../lib/graffle";

/**
 * Project Types
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

/**
 * Get all projects with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getProjects = server$(
  async (
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<Project>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetProjects($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        projects(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
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
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 10,
        sortBy: pagination.sortBy || "createdAt",
        sortDirection: pagination.sortDirection || "DESC",
      });

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to fetch projects");
      }

      // Graffle returns the data directly, not wrapped in a "data" property
      if (!result?.projects) {
        console.error(
          "❌ Invalid projects response structure. Expected result.projects, got:",
          result,
        );
        throw new Error("Invalid projects response");
      }

      return result.projects;
    } catch (error) {
      console.error("Get projects error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch projects",
      );
    }
  },
);

/**
 * Get project by ID
 * Server-side GraphQL query using Qwik server$
 */
export const getProjectById = server$(
  async (id: string): Promise<Project | null> => {
    const client = createGraphQLClient();

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

      if (result?.errors?.length) {
        console.error("Get project by ID error:", result.errors[0].message);
        return null;
      }

      return result?.project || null;
    } catch (error) {
      console.error("Get project by ID error:", error);
      return null;
    }
  },
);

/**
 * Get projects by user ID
 * Server-side GraphQL query using Qwik server$
 */
export const getProjectsByUser = server$(
  async (
    userId: string,
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<Project>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetProjectsByUser($userId: ID!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        projectsByUser(userId: $userId, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
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
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 10,
        sortBy: pagination.sortBy || "createdAt",
        sortDirection: pagination.sortDirection || "DESC",
      });

      if (result?.errors?.length) {
        throw new Error(
          result.errors[0].message || "Failed to fetch projects by user",
        );
      }

      if (!result?.projectsByUser) {
        throw new Error("Invalid projects by user response");
      }

      return result.projectsByUser;
    } catch (error) {
      console.error("Get projects by user error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch projects by user",
      );
    }
  },
);

/**
 * Create new project
 * Server-side GraphQL mutation using Qwik server$
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

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to create project");
      }

      if (!result?.createProject) {
        throw new Error("Invalid create project response");
      }

      return result.createProject;
    } catch (error) {
      console.error("Create project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    }
  },
);

/**
 * Update project
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateProject = server$(
  async (
    token: string,
    id: string,
    projectData: UpdateProjectInput,
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
    `.send({ id, input: projectData });

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to update project");
      }

      if (!result?.updateProject) {
        throw new Error("Invalid update project response");
      }

      return result.updateProject;
    } catch (error) {
      console.error("Update project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update project",
      );
    }
  },
);

/**
 * Delete project
 * Server-side GraphQL mutation using Qwik server$
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

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to delete project");
      }

      return result?.deleteProject || false;
    } catch (error) {
      console.error("Delete project error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete project",
      );
    }
  },
);
