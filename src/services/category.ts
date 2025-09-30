import { server$ } from '@builder.io/qwik-city'
import { createGraphQLClient, createAuthenticatedClient, type PaginationInput, type PaginatedResponse } from '../lib/graffle'

/**
 * Category Types
 */
export interface Category {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  resumeContents: ResumeContent[]
}

export interface CreateCategoryInput {
  name: string
  description?: string
}

export interface UpdateCategoryInput {
  name?: string
  description?: string
}

/**
 * Resume Content Types
 */
export interface ResumeContent {
  id: string
  title: string
  description?: string
  detail?: string
  categoryId: string
  category: {
    id: string
    name: string
    description?: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateResumeContentInput {
  title: string
  description?: string
  detail?: string
  categoryId: string
}

export interface UpdateResumeContentInput {
  title?: string
  description?: string
  detail?: string
  categoryId?: string
}

/**
 * Category Services
 */

/**
 * Get all categories with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getCategories = server$(async (
  pagination: PaginationInput = {}
): Promise<PaginatedResponse<Category>> => {
  const client = createGraphQLClient()
  
  try {
    const result = await client.gql`
      query GetCategories($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        categories(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
          data {
            id
            name
            description
            createdAt
            updatedAt
            resumeContents {
              id
              title
              description
              detail
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
      sortBy: pagination.sortBy || 'name',
      sortDirection: pagination.sortDirection || 'ASC'
    })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to fetch categories')
    }

    // Graffle returns the data directly, not wrapped in a "data" property
    if (!result?.categories) {
      console.error('❌ Invalid categories response structure. Expected result.categories, got:', result)
      throw new Error('Invalid categories response')
    }

    return result.categories
  } catch (error) {
    console.error('Get categories error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch categories')
  }
})

/**
 * Get category by ID
 * Server-side GraphQL query using Qwik server$
 */
export const getCategoryById = server$(async (id: string): Promise<Category | null> => {
  const client = createGraphQLClient()
  
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
            description
            detail
            createdAt
            updatedAt
          }
        }
      }
    `.send({ id })

    if (result?.errors?.length) {
      console.error('Get category by ID error:', result.errors[0].message)
      return null
    }

    return result?.data?.category || null
  } catch (error) {
    console.error('Get category by ID error:', error)
    return null
  }
})

/**
 * Create new category
 * Server-side GraphQL mutation using Qwik server$
 */
export const createCategory = server$(async (
  token: string,
  categoryData: CreateCategoryInput
): Promise<Category> => {
  const client = createAuthenticatedClient(token)
  
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
            description
            detail
            createdAt
            updatedAt
          }
        }
      }
    `.send({ input: categoryData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to create category')
    }

    if (!result?.data?.createCategory) {
      throw new Error('Invalid create category response')
    }

    return result.createCategory
  } catch (error) {
    console.error('Create category error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to create category')
  }
})

/**
 * Update category
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateCategory = server$(async (
  token: string,
  id: string,
  categoryData: UpdateCategoryInput
): Promise<Category> => {
  const client = createAuthenticatedClient(token)
  
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
            description
            detail
            createdAt
            updatedAt
          }
        }
      }
    `.send({ id, input: categoryData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to update category')
    }

    if (!result?.data?.updateCategory) {
      throw new Error('Invalid update category response')
    }

    return result.updateCategory
  } catch (error) {
    console.error('Update category error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to update category')
  }
})

/**
 * Delete category
 * Server-side GraphQL mutation using Qwik server$
 */
export const deleteCategory = server$(async (
  token: string,
  id: string
): Promise<boolean> => {
  const client = createAuthenticatedClient(token)
  
  try {
    const result = await client.gql`
      mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }
    `.send({ id })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to delete category')
    }

    return result?.data?.deleteCategory || false
  } catch (error) {
    console.error('Delete category error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to delete category')
  }
})

/**
 * Resume Content Services
 */

/**
 * Get all resume contents with pagination
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContents = server$(async (
  pagination: PaginationInput = {}
): Promise<PaginatedResponse<ResumeContent>> => {
  const client = createGraphQLClient()
  
  try {
    const result = await client.gql`
      query GetResumeContents($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        resumeContents(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
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
      pageSize: pagination.pageSize || 10,
      sortBy: pagination.sortBy || 'createdAt',
      sortDirection: pagination.sortDirection || 'DESC'
    })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to fetch resume contents')
    }

    if (!result?.data?.resumeContents) {
      throw new Error('Invalid resume contents response')
    }

    return result.resumeContents
  } catch (error) {
    console.error('Get resume contents error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch resume contents')
  }
})

/**
 * Get resume content by ID
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContentById = server$(async (id: string): Promise<ResumeContent | null> => {
  const client = createGraphQLClient()
  
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
    `.send({ id })

    if (result?.errors?.length) {
      console.error('Get resume content by ID error:', result.errors[0].message)
      return null
    }

    return result?.data?.resumeContent || null
  } catch (error) {
    console.error('Get resume content by ID error:', error)
    return null
  }
})

/**
 * Get resume contents by category
 * Server-side GraphQL query using Qwik server$
 */
export const getResumeContentsByCategory = server$(async (
  categoryId: string,
  pagination: PaginationInput = {}
): Promise<PaginatedResponse<ResumeContent>> => {
  const client = createGraphQLClient()
  
  try {
    const result = await client.gql`
      query GetResumeContentsByCategory($categoryId: ID!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
        resumeContentsByCategory(categoryId: $categoryId, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
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
      pageSize: pagination.pageSize || 10,
      sortBy: pagination.sortBy || 'createdAt',
      sortDirection: pagination.sortDirection || 'DESC'
    })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to fetch resume contents by category')
    }

    if (!result?.data?.resumeContentsByCategory) {
      throw new Error('Invalid resume contents by category response')
    }

    return result.resumeContentsByCategory
  } catch (error) {
    console.error('Get resume contents by category error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch resume contents by category')
  }
})

/**
 * Create new resume content
 * Server-side GraphQL mutation using Qwik server$
 */
export const createResumeContent = server$(async (
  token: string,
  contentData: CreateResumeContentInput
): Promise<ResumeContent> => {
  const client = createAuthenticatedClient(token)
  
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
    `.send({ input: contentData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to create resume content')
    }

    if (!result?.data?.createResumeContent) {
      throw new Error('Invalid create resume content response')
    }

    return result.createResumeContent
  } catch (error) {
    console.error('Create resume content error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to create resume content')
  }
})

/**
 * Update resume content
 * Server-side GraphQL mutation using Qwik server$
 */
export const updateResumeContent = server$(async (
  token: string,
  id: string,
  contentData: UpdateResumeContentInput
): Promise<ResumeContent> => {
  const client = createAuthenticatedClient(token)
  
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
    `.send({ id, input: contentData })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to update resume content')
    }

    if (!result?.data?.updateResumeContent) {
      throw new Error('Invalid update resume content response')
    }

    return result.updateResumeContent
  } catch (error) {
    console.error('Update resume content error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to update resume content')
  }
})

/**
 * Delete resume content
 * Server-side GraphQL mutation using Qwik server$
 */
export const deleteResumeContent = server$(async (
  token: string,
  id: string
): Promise<boolean> => {
  const client = createAuthenticatedClient(token)
  
  try {
    const result = await client.gql`
      mutation DeleteResumeContent($id: ID!) {
        deleteResumeContent(id: $id)
      }
    `.send({ id })

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message || 'Failed to delete resume content')
    }

    return result?.data?.deleteResumeContent || false
  } catch (error) {
    console.error('Delete resume content error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to delete resume content')
  }
})