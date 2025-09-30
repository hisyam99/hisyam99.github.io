import { Graffle } from 'graffle'
import '../../graffle/modules/global.js'
import { Graffle as GraphQLClient } from '../../graffle/_namespace.js'

// Environment variables for GraphQL endpoint
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql'

/**
 * Create a base Graffle client instance
 * This client provides the foundation for GraphQL operations
 */
export const createGraphQLClient = (options?: {
  headers?: Record<string, string>
  signal?: AbortSignal
}) => {
  const { headers = {}, signal } = options || {}
  
  return GraphQLClient.create()
    .transport({
      url: GRAPHQL_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      raw: {
        signal,
      },
    })
    .anyware(async ({ exchange }: any) => {
      // Add request/response logging in development
      if (import.meta.env.DEV) {
        const headers = exchange.input.request.headers
        const headersObj = headers instanceof Headers 
          ? Object.fromEntries(headers.entries())
          : headers || {}
          
        console.log('🔄 GraphQL Request:', {
          url: exchange.input.request.url,
          headers: headersObj,
        })
      }
      
      try {
        const result = await exchange()
        
        if (import.meta.env.DEV) {
          console.log('✅ GraphQL Response received')
        }
        
        return result
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('❌ GraphQL Error:', error)
        }
        throw error
      }
    })
}

/**
 * Create an authenticated GraphQL client
 * This includes the Authorization header with JWT token
 */
export const createAuthenticatedClient = (token: string, options?: {
  signal?: AbortSignal
}) => {
  return createGraphQLClient({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: options?.signal,
  })
}

/**
 * Base GraphQL client instance (no authentication)
 * Use this for public operations like login, register, public blog posts
 */
export const graphqlClient = createGraphQLClient()

/**
 * Type definitions for common GraphQL operations
 */
export type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: Array<string | number>
  }>
}

export type PaginationInput = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'ASC' | 'DESC'
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

// Re-export generated client for easy access
export { GraphQLClient }