import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "../lib/graphql/graffle";

/**
 * Admin User Management Types
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role?: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
  isActive?: boolean;
}

export interface UserListFilter {
  page?: number;
  pageSize?: number;
  role?: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST" | "all";
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface UserListResponse {
  data: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get all users for admin
 */
export const getAllUsers = server$(
  async (
    token: string,
    filters: UserListFilter = {},
  ): Promise<UserListResponse> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetAllUsers(
        $page: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
      ) {
        users(
          page: $page
          pageSize: $pageSize
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
          data {
            id
            name
            email
            role
            isActive
            lastLogin
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
        "🔍 Admin user list result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin user list errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch users");
      }

      const userData = result?.data?.users || result?.users;

      if (!userData) {
        console.error("No user data in response:", result);
        throw new Error("Invalid user list response structure");
      }

      return userData;
    } catch (error) {
      console.error("❌ Admin get all users error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch users",
      );
    }
  },
);

/**
 * Get single user by ID for admin
 */
export const getUserById = server$(
  async (token: string, id: string): Promise<User> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetUserById($id: ID!) {
        user(id: $id) {
          id
          name
          email
          role
          isActive
          lastLogin
          createdAt
          updatedAt
        }
      }
    `.send({ id });

      console.log(
        "🔍 Admin get user by ID result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin get user by ID errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to fetch user");
      }

      const userData = result?.data?.user || result?.user;

      if (!userData) {
        throw new Error("User not found");
      }

      return userData;
    } catch (error) {
      console.error("❌ Admin get user by ID error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch user",
      );
    }
  },
);

/**
 * Create new user
 */
export const createUser = server$(
  async (token: string, userData: CreateUserInput): Promise<User> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
          role
          isActive
          lastLogin
          createdAt
          updatedAt
        }
      }
    `.send({ input: userData });

      console.log(
        "🔍 Admin create user result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin create user errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to create user");
      }

      const newUser = result?.data?.createUser || result?.createUser;

      if (!newUser) {
        console.error("No user data in create response:", result);
        throw new Error("Invalid create user response structure");
      }

      return newUser;
    } catch (error) {
      console.error("❌ Admin create user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create user",
      );
    }
  },
);

/**
 * Update user
 */
export const updateUser = server$(
  async (
    token: string,
    userData: UpdateUserInput & { id: string },
  ): Promise<User> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
          id
          name
          email
          role
          isActive
          lastLogin
          createdAt
          updatedAt
        }
      }
    `.send({
        id: userData.id,
        input: {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive,
        },
      });

      console.log(
        "🔍 Admin update user result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update user errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to update user");
      }

      const updatedUser = result?.data?.updateUser || result?.updateUser;

      if (!updatedUser) {
        console.error("No user data in update response:", result);
        throw new Error("Invalid update user response structure");
      }

      return updatedUser;
    } catch (error) {
      console.error("❌ Admin update user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    }
  },
);

/**
 * Delete user
 */
export const deleteUser = server$(
  async (token: string, id: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `.send({ id });

      console.log(
        "🔍 Admin delete user result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin delete user errors:", result.errors);
        throw new Error(result.errors[0].message || "Failed to delete user");
      }

      const deleteResult = result?.data?.deleteUser || result?.deleteUser;
      return deleteResult || false;
    } catch (error) {
      console.error("❌ Admin delete user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete user",
      );
    }
  },
);

/**
 * Update user role
 */
export const updateUserRole = server$(
  async (
    token: string,
    userId: string,
    role: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST",
  ): Promise<User> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation UpdateUserRole($userId: ID!, $role: UserRole!) {
        updateUserRole(userId: $userId, role: $role) {
          id
          name
          email
          role
          isActive
          lastLogin
          createdAt
          updatedAt
        }
      }
    `.send({ userId, role });

      console.log(
        "🔍 Admin update user role result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin update user role errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to update user role",
        );
      }

      const updatedUser =
        result?.data?.updateUserRole || result?.updateUserRole;

      if (!updatedUser) {
        console.error("No user data in update role response:", result);
        throw new Error("Invalid update user role response structure");
      }

      return updatedUser;
    } catch (error) {
      console.error("❌ Admin update user role error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update user role",
      );
    }
  },
);

/**
 * Deactivate user
 */
export const deactivateUser = server$(
  async (token: string, userId: string): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation DeactivateUser($userId: ID!) {
        deactivateUser(userId: $userId)
      }
    `.send({ userId });

      console.log(
        "🔍 Admin deactivate user result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Admin deactivate user errors:", result.errors);
        throw new Error(
          result.errors[0].message || "Failed to deactivate user",
        );
      }

      const deactivateResult =
        result?.data?.deactivateUser || result?.deactivateUser;
      return deactivateResult || false;
    } catch (error) {
      console.error("❌ Admin deactivate user error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to deactivate user",
      );
    }
  },
);

/**
 * Validate user data
 */
export const validateUserData = (data: Partial<CreateUserInput>): string[] => {
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("Name is required");
  }

  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.role) {
    errors.push("Role is required");
  }

  return errors;
};
