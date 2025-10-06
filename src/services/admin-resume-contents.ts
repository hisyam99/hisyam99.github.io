import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "../lib/graphql/graffle-with-refresh";

/**
 * Admin Resume Content Management Types
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

export interface CreateResumeContentInput {
  title: string;
  description?: string;
  detail?: string;
  categoryId: string;
}

export interface UpdateResumeContentInput {
  title?: string;
  description?: string;
  detail?: string;
  categoryId?: string;
}

export interface ResumeContentListFilter {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface ResumeContentListResponse {
  data: ResumeContent[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all resume contents for admin
 */
export const getAllResumeContents = server$(
  async (
    token: string,
    filters: ResumeContentListFilter = {},
  ): Promise<ResumeContentListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetAllResumeContents(
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        resumeContents(
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
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
        page: filters.page || 1,
        pageSize: filters.pageSize || 50,
        sortBy: filters.sortBy || "createdAt",
        sortDirection: filters.sortDirection || "DESC",
      });

      console.log(
        "🔍 Admin resume content list result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin resume content list errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to fetch resume contents",
        );
      }

      const resumeContentData =
        result?.data?.resumeContents || result?.resumeContents;

      if (!resumeContentData) {
        console.error("No resume content data in response:", result);
        throw new Error("Invalid resume content list response structure");
      }

      return resumeContentData;
    } catch (error) {
      console.error("❌ Admin get all resume contents error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch resume contents",
      );
    }
  },
);

/**
 * Get resume contents by category
 */
export const getResumeContentsByCategory = server$(
  async (
    token: string,
    categoryId: string,
    filters: ResumeContentListFilter = {},
  ): Promise<ResumeContentListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetResumeContentsByCategory(
        $categoryId: ID!
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        resumeContentsByCategory(
          categoryId: $categoryId
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
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
        page: filters.page || 1,
        pageSize: filters.pageSize || 50,
        sortBy: filters.sortBy || "createdAt",
        sortDirection: filters.sortDirection || "DESC",
      });

      console.log(
        "🔍 Admin resume contents by category result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error(
          "Admin resume contents by category errors:",
          result.errors,
        );
        throw new Error(
          result.errors[0].message ||
            "Failed to fetch resume contents by category",
        );
      }

      const resumeContentData =
        result?.data?.resumeContentsByCategory ||
        result?.resumeContentsByCategory;

      if (!resumeContentData) {
        console.error("No resume content data in response:", result);
        throw new Error(
          "Invalid resume contents by category response structure",
        );
      }

      return resumeContentData;
    } catch (error) {
      console.error("❌ Admin get resume contents by category error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch resume contents by category",
      );
    }
  },
);

/**
 * Get single resume content by ID for admin
 */
export const getResumeContentById = server$(
  async (token: string, id: string): Promise<ResumeContent> => {
    const client = createAuthenticatedClient(token);

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

      console.log(
        "🔍 Admin get resume content by ID result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin get resume content by ID errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to fetch resume content",
        );
      }

      const resumeContentData =
        result?.data?.resumeContent || result?.resumeContent;

      if (!resumeContentData) {
        throw new Error("Resume content not found");
      }

      return resumeContentData;
    } catch (error) {
      console.error("❌ Admin get resume content by ID error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch resume content",
      );
    }
  },
);

/**
 * Create new resume content
 */
export const createResumeContent = server$(
  async (
    token: string,
    resumeContentData: CreateResumeContentInput,
  ): Promise<ResumeContent> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation CreateResumeContent($input: CreateResumeContentInput!) {
        createResumeContent(input: $input) {
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
    `.send({ input: resumeContentData });

      console.log(
        "🔍 Admin create resume content result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin create resume content errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to create resume content",
        );
      }

      const newResumeContent =
        result?.data?.createResumeContent || result?.createResumeContent;

      if (!newResumeContent) {
        console.error("No resume content data in create response:", result);
        throw new Error("Invalid create resume content response structure");
      }

      return newResumeContent;
    } catch (error) {
      console.error("❌ Admin create resume content error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to create resume content",
      );
    }
  },
);

/**
 * Update resume content
 */
export const updateResumeContent = server$(
  async (
    token: string,
    resumeContentData: UpdateResumeContentInput & { id: string },
  ): Promise<ResumeContent> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateResumeContent($id: ID!, $input: UpdateResumeContentInput!) {
        updateResumeContent(id: $id, input: $input) {
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
    `.send({
        id: resumeContentData.id,
        input: {
          title: resumeContentData.title,
          description: resumeContentData.description,
          detail: resumeContentData.detail,
          categoryId: resumeContentData.categoryId,
        },
      });

      console.log(
        "🔍 Admin update resume content result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update resume content errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to update resume content",
        );
      }

      const updatedResumeContent =
        result?.data?.updateResumeContent || result?.updateResumeContent;

      if (!updatedResumeContent) {
        console.error("No resume content data in update response:", result);
        throw new Error("Invalid update resume content response structure");
      }

      return updatedResumeContent;
    } catch (error) {
      console.error("❌ Admin update resume content error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to update resume content",
      );
    }
  },
);

/**
 * Delete resume content
 */
export const deleteResumeContent = server$(
  async (token: string, id: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeleteResumeContent($id: ID!) {
        deleteResumeContent(id: $id)
      }
    `.send({ id });

      console.log(
        "🔍 Admin delete resume content result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin delete resume content errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to delete resume content",
        );
      }

      const deleteResult =
        result?.data?.deleteResumeContent || result?.deleteResumeContent;
      return deleteResult || false;
    } catch (error) {
      console.error("❌ Admin delete resume content error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to delete resume content",
      );
    }
  },
);

/**
 * Validate resume content data
 */
export const validateResumeContentData = (
  data: Partial<CreateResumeContentInput>,
): string[] => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Title is required");
  }

  if (!data.categoryId?.trim()) {
    errors.push("Category is required");
  }

  return errors;
};
