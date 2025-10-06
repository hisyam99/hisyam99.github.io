import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "../lib/graphql/graffle-with-refresh";

/**
 * Admin Blog Management Types
 */
export interface BlogCreateData {
  title: string;
  content: string;
  summary: string;
  slug: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  tags: string[];
  metaDescription: string;
}

export interface BlogUpdateData extends Partial<BlogCreateData> {
  id: string;
}

export interface BlogListFilter {
  page?: number;
  pageSize?: number;
  status?: "DRAFT" | "PUBLISHED" | "all";
  search?: string;
  author?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  slug: string;
  author: string;
  publishedAt?: string;
  status: "DRAFT" | "PUBLISHED" | "draft" | "published"; // Support both backend formats
  tags: string[];
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  data: Blog[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all blogs for admin (including drafts and archived)
 */
export const getAllBlogs = server$(
  async (
    token: string,
    filters: BlogListFilter = {},
  ): Promise<BlogListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetAllBlogs(
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        blogs(
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
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
        page: filters.page || 1,
        pageSize: filters.pageSize || 50, // Get more blogs for client-side filtering
        sortBy: filters.sortBy || "updatedAt",
        sortDirection: filters.sortDirection || "DESC",
      });

      console.log(
        "🔍 Admin blog list result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin blog list errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch blogs");
      }

      const blogData = result?.data?.blogs || result?.blogs;

      if (!blogData) {
        console.error("No blog data in response:", result);
        throw new Error("Invalid blog list response structure");
      }

      return blogData;
    } catch (error) {
      console.error("❌ Admin get all blogs error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch blogs",
      );
    }
  },
);

/**
 * Get single blog by ID for admin
 */
export const getBlogById = server$(
  async (token: string, id: string): Promise<Blog> => {
    const client = createAuthenticatedClient(token);

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

      console.log(
        "🔍 Admin get blog by ID result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin get blog by ID errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch blog");
      }

      const blogData = result?.data?.blog || result?.blog;

      if (!blogData) {
        throw new Error("Blog not found");
      }

      return blogData;
    } catch (error) {
      console.error("❌ Admin get blog by ID error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch blog",
      );
    }
  },
);

/**
 * Create new blog post
 */
export const createBlog = server$(
  async (token: string, blogData: BlogCreateData): Promise<Blog> => {
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

      console.log(
        "🔍 Admin create blog result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin create blog errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to create blog");
      }

      const newBlog = result?.data?.createBlog || result?.createBlog;

      if (!newBlog) {
        console.error("No blog data in create response:", result);
        throw new Error("Invalid create blog response structure");
      }

      return newBlog;
    } catch (error) {
      console.error("❌ Admin create blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create blog",
      );
    }
  },
);

/**
 * Update blog post
 */
export const updateBlog = server$(
  async (token: string, blogData: BlogUpdateData): Promise<Blog> => {
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
    `.send({
        id: blogData.id,
        input: {
          title: blogData.title,
          content: blogData.content,
          summary: blogData.summary,
          slug: blogData.slug,
          author: blogData.author,
          status: blogData.status,
          tags: blogData.tags,
          metaDescription: blogData.metaDescription,
        },
      });

      console.log(
        "🔍 Admin update blog result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update blog errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to update blog");
      }

      const updatedBlog = result?.data?.updateBlog || result?.updateBlog;

      if (!updatedBlog) {
        console.error("No blog data in update response:", result);
        throw new Error("Invalid update blog response structure");
      }

      return updatedBlog;
    } catch (error) {
      console.error("❌ Admin update blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update blog",
      );
    }
  },
);

/**
 * Delete blog post
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

      console.log(
        "🔍 Admin delete blog result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin delete blog errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to delete blog");
      }

      const deleteResult = result?.data?.deleteBlog || result?.deleteBlog;
      return deleteResult || false;
    } catch (error) {
      console.error("❌ Admin delete blog error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete blog",
      );
    }
  },
);

/**
 * Bulk update blog status
 */
export const bulkUpdateBlogStatus = server$(
  async (
    token: string,
    ids: string[],
    status: "DRAFT" | "PUBLISHED",
  ): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      // Since there's no bulk update mutation, update each blog individually
      const updatePromises = ids.map(async (id) => {
        const result = await client.gql`
        mutation UpdateBlogStatus($id: ID!, $input: UpdateBlogInput!) {
          updateBlog(id: $id, input: $input) {
            id
            status
          }
        }
      `.send({
          id,
          input: { status },
        });

        if (result?.errors?.length) {
          console.error(`Error updating blog ${id}:`, result.errors);
          throw new Error(
            result.errors[0].message || `Failed to update blog ${id}`,
          );
        }

        return result;
      });

      await Promise.all(updatePromises);

      console.log(`✅ Successfully updated ${ids.length} blogs to ${status}`);
      return true;
    } catch (error) {
      console.error("❌ Admin bulk update blog status error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to bulk update blog status",
      );
    }
  },
);

/**
 * Generate slug from title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing spaces
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Validate blog data
 */
export const validateBlogData = (data: Partial<BlogCreateData>): string[] => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Title is required");
  }

  if (!data.content?.trim()) {
    errors.push("Content is required");
  }

  if (!data.summary?.trim()) {
    errors.push("Summary is required");
  }

  if (!data.slug?.trim()) {
    errors.push("Slug is required");
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push(
      "Slug can only contain lowercase letters, numbers, and hyphens",
    );
  }

  if (!data.author?.trim()) {
    errors.push("Author is required");
  }

  return errors;
};
