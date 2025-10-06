import { server$ } from "@builder.io/qwik-city";
import {
  createGraphQLClient,
  type PaginationInput,
  type PaginatedResponse,
} from "../lib/graphql/graffle";

/**
 * Resume Content Types for Guest
 */
export interface ResumeContent {
  id: string;
  title: string;
  description?: string;
  detail?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResumeContentsByCategory {
  categoryId: string;
  categoryName: string;
  contents: ResumeContent[];
}

/**
 * Get all resume contents (public)
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContents = server$(
  async (
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<ResumeContent>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetResumeContents($page: Int, $pageSize: Int, $sortBy: String) {
        resumeContents(page: $page, pageSize: $pageSize, sortBy: $sortBy) {
          data {
            id
            title
            description
            detail
            categoryId
            category {
              id
              name
              description
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
        pageSize: pagination.pageSize || 50,
        sortBy: pagination.sortBy || "createdAt",
      });

      if (result?.errors?.length) {
        throw new Error(
          result.errors[0].message || "Failed to fetch resume contents",
        );
      }

      if (!result?.resumeContents) {
        console.error(
          "❌ Invalid resume contents response structure. Expected result.resumeContents, got:",
          result,
        );
        throw new Error("Invalid resume contents response");
      }

      return result.resumeContents;
    } catch (error) {
      console.error("Get resume contents error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch resume contents",
      );
    }
  },
);

/**
 * Get resume contents by category (public)
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContentsByCategory = server$(
  async (
    categoryId: string,
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<ResumeContent>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetResumeContentsByCategory($categoryId: ID!, $page: Int, $pageSize: Int, $sortBy: String) {
        resumeContentsByCategory(categoryId: $categoryId, page: $page, pageSize: $pageSize, sortBy: $sortBy) {
          data {
            id
            title
            description
            detail
            categoryId
            category {
              id
              name
              description
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
        categoryId,
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 50,
        sortBy: pagination.sortBy || "createdAt",
      });

      if (result?.errors?.length) {
        throw new Error(
          result.errors[0].message ||
            "Failed to fetch resume contents by category",
        );
      }

      if (!result?.resumeContentsByCategory) {
        console.error(
          "❌ Invalid resume contents by category response structure. Expected result.resumeContentsByCategory, got:",
          result,
        );
        throw new Error("Invalid resume contents by category response");
      }

      return result.resumeContentsByCategory;
    } catch (error) {
      console.error("Get resume contents by category error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch resume contents by category",
      );
    }
  },
);

/**
 * Get resume content by ID (public)
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContentById = server$(
  async (id: string): Promise<ResumeContent | null> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetResumeContentById($id: ID!) {
        resumeContent(id: $id) {
          id
          title
          description
          detail
          categoryId
          category {
            id
            name
            description
          }
          createdAt
          updatedAt
        }
      }
    `.send({ id });

      if (result?.errors?.length) {
        console.error(
          "Get resume content by ID error:",
          result.errors[0].message,
        );
        return null;
      }

      return result?.resumeContent || null;
    } catch (error) {
      console.error("Get resume content by ID error:", error);
      return null;
    }
  },
);

/**
 * Get resume contents grouped by category
 * Helper function to organize resume contents by their categories
 */
export const getResumeContentsByCategories = server$(
  async (): Promise<ResumeContentsByCategory[]> => {
    const client = createGraphQLClient();

    try {
      // First, get all resume contents
      const result = await client.gql`
      query GetAllResumeContents {
        resumeContents(page: 1, pageSize: 100, sortBy: "createdAt") {
          data {
            id
            title
            description
            detail
            categoryId
            category {
              id
              name
              description
            }
            createdAt
            updatedAt
          }
        }
      }
    `.send();

      if (result?.errors?.length) {
        throw new Error(
          result.errors[0].message || "Failed to fetch resume contents",
        );
      }

      const contents = result?.resumeContents?.data || [];

      // Group by category
      const groupedMap = new Map<string, ResumeContentsByCategory>();

      for (const content of contents) {
        const categoryId = content.category.id;
        const categoryName = content.category.name;

        if (!groupedMap.has(categoryId)) {
          groupedMap.set(categoryId, {
            categoryId,
            categoryName,
            contents: [],
          });
        }

        groupedMap.get(categoryId)!.contents.push(content);
      }

      return Array.from(groupedMap.values());
    } catch (error) {
      console.error("Get resume contents by categories error:", error);
      return [];
    }
  },
);
