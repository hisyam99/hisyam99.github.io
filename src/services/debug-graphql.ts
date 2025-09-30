import { server$ } from '@builder.io/qwik-city'
import { createGraphQLClient } from '../lib/graffle'

/**
 * Debug GraphQL response to see what we're actually getting
 */
export const debugGraphQLResponse = server$(async () => {
  const client = createGraphQLClient()
  
  try {
    console.log('🔍 Starting GraphQL debug...')
    
    // Test 1: Simple introspection query
    const introspectionResult = await client.gql`
      query IntrospectionTest {
        __schema {
          queryType {
            name
          }
        }
      }
    `.send()
    
    console.log('📊 Introspection result:', JSON.stringify(introspectionResult, null, 2))
    
    // Test 2: Try to get the actual published blogs
    const publishedBlogsResult = await client.gql`
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
      page: 1,
      pageSize: 10,
      sortBy: 'publishedAt',
      sortDirection: 'DESC'
    })

    console.log('📊 Published blogs result:', JSON.stringify(publishedBlogsResult, null, 2))
    
    // Test 3: Try the simpler blogs query
    const allBlogsResult = await client.gql`
      query GetBlogs($page: Int, $pageSize: Int) {
        blogs(page: $page, pageSize: $pageSize) {
          data {
            id
            title
            status
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
      page: 1,
      pageSize: 5
    })

    console.log('📊 All blogs result:', JSON.stringify(allBlogsResult, null, 2))

    return {
      success: true,
      introspection: introspectionResult,
      publishedBlogs: publishedBlogsResult,
      allBlogs: allBlogsResult
    }
  } catch (error) {
    console.error('❌ GraphQL debug error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }
  }
})