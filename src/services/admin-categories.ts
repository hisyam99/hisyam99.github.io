import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "../lib/graphql/graffle-with-refresh";

/**
 * Admin Category Management Types
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  resumeContents: Array<{
    id: string;
    title: string;
  }>;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}

export interface CategoryListFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface CategoryListResponse {
  data: Category[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all categories for admin
 */
export const getAllCategories = server$(
  async (
    token: string,
    filters: CategoryListFilter = {},
  ): Promise<CategoryListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetAllCategories(
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        categories(
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
          data {
            id
            name
            description
            createdAt
            updatedAt
            resumeContents {
              id
              title
            }
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
        sortBy: filters.sortBy || "name",
        sortDirection: filters.sortDirection || "ASC",
      });

      console.log(
        "🔍 Admin category list result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin category list errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to fetch categories",
        );
      }

      const categoryData = result?.data?.categories || result?.categories;

      if (!categoryData) {
        console.error("No category data in response:", result);
        throw new Error("Invalid category list response structure");
      }

      return categoryData;
    } catch (error) {
      console.error("❌ Admin get all categories error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch categories",
      );
    }
  },
);

/**
 * Get single category by ID for admin
 */
export const getCategoryById = server$(
  async (token: string, id: string): Promise<Category> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetCategoryById($id: ID!) {
        category(id: $id) {
          id
          name
          description
          createdAt
          updatedAt
          resumeContents {
            id
            title
          }
        }
      }
    `.send({ id });

      console.log(
        "🔍 Admin get category by ID result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin get category by ID errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch category");
      }

      const categoryData = result?.data?.category || result?.category;

      if (!categoryData) {
        throw new Error("Category not found");
      }

      return categoryData;
    } catch (error) {
      console.error("❌ Admin get category by ID error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch category",
      );
    }
  },
);

/**
 * Create new category
 */
export const createCategory = server$(
  async (
    token: string,
    categoryData: CreateCategoryInput,
  ): Promise<Category> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
          id
          name
          description
          createdAt
          updatedAt
          resumeContents {
            id
            title
          }
        }
      }
    `.send({ input: categoryData });

      console.log(
        "🔍 Admin create category result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin create category errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to create category",
        );
      }

      const newCategory =
        result?.data?.createCategory || result?.createCategory;

      if (!newCategory) {
        console.error("No category data in create response:", result);
        throw new Error("Invalid create category response structure");
      }

      return newCategory;
    } catch (error) {
      console.error("❌ Admin create category error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create category",
      );
    }
  },
);

/**
 * Update category
 */
export const updateCategory = server$(
  async (
    token: string,
    categoryData: UpdateCategoryInput & { id: string },
  ): Promise<Category> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
        updateCategory(id: $id, input: $input) {
          id
          name
          description
          createdAt
          updatedAt
          resumeContents {
            id
            title
          }
        }
      }
    `.send({
        id: categoryData.id,
        input: {
          name: categoryData.name,
          description: categoryData.description,
        },
      });

      console.log(
        "🔍 Admin update category result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update category errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to update category",
        );
      }

      const updatedCategory =
        result?.data?.updateCategory || result?.updateCategory;

      if (!updatedCategory) {
        console.error("No category data in update response:", result);
        throw new Error("Invalid update category response structure");
      }

      return updatedCategory;
    } catch (error) {
      console.error("❌ Admin update category error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update category",
      );
    }
  },
);

/**
 * Delete category
 */
export const deleteCategory = server$(
  async (token: string, id: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }
    `.send({ id });

      console.log(
        "🔍 Admin delete category result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin delete category errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to delete category",
        );
      }

      const deleteResult =
        result?.data?.deleteCategory || result?.deleteCategory;
      return deleteResult || false;
    } catch (error) {
      console.error("❌ Admin delete category error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete category",
      );
    }
  },
);

/**
 * Validate category data
 */
export const validateCategoryData = (
  data: Partial<CreateCategoryInput>,
): string[] => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("Name is required");
  }

  return errors;
};
