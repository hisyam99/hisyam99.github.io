import { server$ } from '@builder.io/qwik-city'

/**
 * Simple GraphQL connection test
 */
export const testGraphQLConnection = server$(async () => {
  const GRAPHQL_ENDPOINT = 'http://localhost:4001/graphql'
  
  try {
    console.log('🔍 Testing GraphQL connection to:', GRAPHQL_ENDPOINT)
    
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query TestConnection {
            __typename
          }
        `
      })
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📡 Response data:', data)
    
    return {
      success: true,
      status: response.status,
      data
    }
  } catch (error) {
    console.error('❌ GraphQL connection test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})