import { server$ } from "@builder.io/qwik-city";
import {
  createGraphQLClient,
  type PaginationInput,
  type PaginatedResponse,
} from "../lib/graphql/graffle";
import { createAuthenticatedClient } from "../lib/graphql/graffle-with-refresh";

/**
 * Blog Types
 */
export interface Blog {
  id: string;
  title: string;
  content: string;
  summary?: string;
  slug: string;
  author?: string;
  publishedAt?: string;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  summary?: string;
  slug: string;
  author?: string;
  status?: "DRAFT" | "PUBLISHED";
  tags?: string[];
  metaDescription?: string;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
  summary?: string;
  slug?: string;
  author?: string;
  status?: "DRAFT" | "PUBLISHED";
  tags?: string[];
  metaDescription?: string;
}

/**
 * Get all blogs with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getBlogs = server$(
  async (
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<Blog>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetBlogs($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        blogs(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
          data {
            id
            title
            content
            summary
            slug
            author
            publishedAt
            status
            tags
            metaDescription
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
        throw new Error(result.errors[0].message || "Failed to fetch blogs");
      }

      if (!result?.blogs) {
        throw new Error("Invalid blogs response");
      }

      return result.blogs;
    } catch (error) {
      console.error("Get blogs error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch blogs",
      );
    }
  },
);

/**
 * Get published blogs with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getPublishedBlogs = server$(
  async (
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<Blog>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetPublishedBlogs($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        publishedBlogs(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
          data {
            id
            title
            content
            summary
            slug
            author
            publishedAt
            status
            tags
            metaDescription
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
        sortBy: pagination.sortBy || "publishedAt",
        sortDirection: pagination.sortDirection || "DESC",
      });

      console.log(
        "📊 Published blogs GraphQL result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("❌ GraphQL errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to fetch published blogs",
        );
      }

      // Graffle returns the data directly, not wrapped in a "data" property
      if (!result?.publishedBlogs) {
        console.error(
          "❌ Invalid response structure. Expected result.publishedBlogs, got:",
          {
            hasResult: !!result,
            resultKeys: result ? Object.keys(result) : [],
            fullResult: result,
          },
        );
        throw new Error("Invalid published blogs response");
      }

      return result.publishedBlogs;
    } catch (error) {
      console.error("Get published blogs error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch published blogs",
      );
    }
  },
);

/**
 * Get blog by ID
 * Server-side GraphQL query using Qwik server$
 */
export const getBlogById = server$(async (id: string): Promise<Blog | null> => {
  const client = createGraphQLClient();

  try {
    const result = await client.gql`
      query GetBlogById($id: ID!) {
        blog(id: $id) {
          id
          title
          content
          summary
          slug
          author
          publishedAt
          status
          tags
          metaDescription
          createdAt
          updatedAt
        }
      }
    `.send({ id });

    if (result?.errors?.length) {
      console.error("Get blog by ID error:", result.errors[0].message);
      return null;
    }

    return result?.blog || null;
  } catch (error) {
    console.error("Get blog by ID error:", error);
    return null;
  }
});

/**
 * Get blog by slug
 * Server-side GraphQL query using Qwik server$
 */
export const getBlogBySlug = server$(
  async (slug: string): Promise<Blog | null> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetBlogBySlug($slug: String!) {
        blogBySlug(slug: $slug) {
          id
          title
          content
          summary
          slug
          author
          publishedAt
          status
          tags
          metaDescription
          createdAt
          updatedAt
        }
      }
    `.send({ slug });

      if (result?.errors?.length) {
        console.error("Get blog by slug error:", result.errors[0].message);
        return null;
      }

      return result?.blogBySlug || null;
    } catch (error) {
      console.error("Get blog by slug error:", error);
      return null;
    }
  },
);

/**
 * Get blogs by status
 * Server-side GraphQL query using Qwik server$
 */
export const getBlogsByStatus = server$(
  async (
    status: "DRAFT" | "PUBLISHED",
    pagination: PaginationInput = {},
  ): Promise<PaginatedResponse<Blog>> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      query GetBlogsByStatus($status: BlogStatus!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        blogsByStatus(status: $status, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
          data {
            id
            title
            content
            summary
            slug
            author
            publishedAt
            status
            tags
            metaDescription
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
        status,
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 10,
        sortBy: pagination.sortBy || "createdAt",
        sortDirection: pagination.sortDirection || "DESC",
      });

      if (result?.errors?.length) {
        throw new Error(
          result.errors[0].message || "Failed to fetch blogs by status",
        );
      }

      if (!result?.blogsByStatus) {
        throw new Error("Invalid blogs by status response");
      }

      return result.blogsByStatus;
    } catch (error) {
      console.error("Get blogs by status error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch blogs by status",
      );
    }
  },
);

/**
 * Create new blog
 * Server-side GraphQL mutation using Qwik server$
 */
export const createBlog = server$(
  async (token: string, blogData: CreateBlogInput): Promise<Blog> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation CreateBlog($input: CreateBlogInput!) {
        createBlog(input: $input) {
          id
          title
          content
          summary
          slug
          author
          publishedAt
          status
          tags
          metaDescription
          createdAt
          updatedAt
        }
      }
    `.send({ input: blogData });

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to create blog");
      }

      if (!result?.createBlog) {
        throw new Error("Invalid create blog response");
      }

      return result.createBlog;
    } catch (error) {
      console.error("Create blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create blog",
      );
    }
  },
);

/**
 * Update blog
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateBlog = server$(
  async (
    token: string,
    id: string,
    blogData: UpdateBlogInput,
  ): Promise<Blog> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
        updateBlog(id: $id, input: $input) {
          id
          title
          content
          summary
          slug
          author
          publishedAt
          status
          tags
          metaDescription
          createdAt
          updatedAt
        }
      }
    `.send({ id, input: blogData });

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to update blog");
      }

      if (!result?.updateBlog) {
        throw new Error("Invalid update blog response");
      }

      return result.updateBlog;
    } catch (error) {
      console.error("Update blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update blog",
      );
    }
  },
);

/**
 * Delete blog
 * Server-side GraphQL mutation using Qwik server$
 */
export const deleteBlog = server$(
  async (token: string, id: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id)
      }
    `.send({ id });

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Failed to delete blog");
      }

      return result?.deleteBlog || false;
    } catch (error) {
      console.error("Delete blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete blog",
      );
    }
  },
);
