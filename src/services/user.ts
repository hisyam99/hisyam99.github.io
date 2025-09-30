import { server$ } from '@builder.io/qwik-city'
import { createAuthenticatedClient, type PaginationInput, type PaginatedResponse } from '../lib/graffle'

/**
 * User Types
 */
export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST'
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
  projects: Project[]
}

export interface Project {
  id: string
  title: string
  description?: string
  userId?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserInput {
  name: string
  email: string
  role?: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST'
}

export interface UpdateUserInput {
  name?: string
  email?: string
  role?: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST'
  isActive?: boolean
}

/**
 * Get all users with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getUsers = server$(async (
  token: string,
  pagination: PaginationInput = {}
): Promise<PaginatedResponse<User>> => {
  const client = createAuthenticatedClient(token)
  
  try {
    const result = await client.gql`
      query GetUsers($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        users(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
          data {
            id
            name
            email
            role
            isActive
            lastLogin
            createdAt
            updatedAt
            projects {
              id
              title
              description
              createdAt
              updatedAt
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
      page: pagination.page || 1,
      pageSize: pagination.pageSize || 10,
      sortBy: pagination.sortBy || 'createdAt',
      sortDirection: pagination.sortDirection || 'DESC'
    })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to fetch users')
    }

    if (!result?.data?.users) {
      throw new Error('Invalid users response')
    }

    return result.users
  } catch (error) {
    console.error('Get users error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch users')
  }
})

/**
 * Get user by ID
 * Server-side GraphQL query using Qwik server$
 */
export const getUserById = server$(async (
  token: string,
  id: string
): Promise<User | null> => {
  const client = createAuthenticatedClient(token)
  
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
          projects {
            id
            title
            description
            createdAt
            updatedAt
          }
        }
      }
    `.send({ id })

    if (result?.errors?.length) {
      console.error('Get user by ID error:', result.errors[0].message)
      return null
    }

    return result?.data?.user || null
  } catch (error) {
    console.error('Get user by ID error:', error)
    return null
  }
})

/**
 * Create new user
 * Server-side GraphQL mutation using Qwik server$
 */
export const createUser = server$(async (
  token: string,
  userData: CreateUserInput
): Promise<User> => {
  const client = createAuthenticatedClient(token)
  
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
          projects {
            id
            title
            description
            createdAt
            updatedAt
          }
        }
      }
    `.send({ input: userData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to create user')
    }

    if (!result?.data?.createUser) {
      throw new Error('Invalid create user response')
    }

    return result.createUser
  } catch (error) {
    console.error('Create user error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to create user')
  }
})

/**
 * Update user
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateUser = server$(async (
  token: string,
  id: string,
  userData: UpdateUserInput
): Promise<User> => {
  const client = createAuthenticatedClient(token)
  
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
          projects {
            id
            title
            description
            createdAt
            updatedAt
          }
        }
      }
    `.send({ id, input: userData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to update user')
    }

    if (!result?.data?.updateUser) {
      throw new Error('Invalid update user response')
    }

    return result.updateUser
  } catch (error) {
    console.error('Update user error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to update user')
  }
})

/**
 * Delete user
 * Server-side GraphQL mutation using Qwik server$
 */
export const deleteUser = server$(async (
  token: string,
  id: string
): Promise<boolean> => {
  const client = createAuthenticatedClient(token)
  
  try {
    const result = await client.gql`
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `.send({ id })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to delete user')
    }

    return result?.data?.deleteUser || false
  } catch (error) {
    console.error('Delete user error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to delete user')
  }
})

/**
 * Update user role
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateUserRole = server$(async (
  token: string,
  userId: string,
  role: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST'
): Promise<User> => {
  const client = createAuthenticatedClient(token)
  
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
          projects {
            id
            title
            description
            createdAt
            updatedAt
          }
        }
      }
    `.send({ userId, role })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to update user role')
    }

    if (!result?.data?.updateUserRole) {
      throw new Error('Invalid update user role response')
    }

    return result.updateUserRole
  } catch (error) {
    console.error('Update user role error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to update user role')
  }
})

/**
 * Deactivate user
 * Server-side GraphQL mutation using Qwik server$
 */
export const deactivateUser = server$(async (
  token: string,
  userId: string
): Promise<boolean> => {
  const client = createAuthenticatedClient(token)
  
  try {
    const result = await client.gql`
      mutation DeactivateUser($userId: ID!) {
        deactivateUser(userId: $userId)
      }
    `.send({ userId })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to deactivate user')
    }

    return result?.data?.deactivateUser || false
  } catch (error) {
    console.error('Deactivate user error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to deactivate user')
  }
})