import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { testGraphQLConnection } from "~/services/test-connection";
import { debugGraphQLResponse } from "~/services/debug-graphql";

// eslint-disable-next-line qwik/loader-location
export const useTestConnectionLoader = routeLoader$(async () => {
  const connectionTest = await testGraphQLConnection()
  const debugTest = await debugGraphQLResponse()
  
  return {
    connection: connectionTest,
    debug: debugTest
  }
})

export default component$(() => {
  const testResult = useTestConnectionLoader()
  const { connection, debug } = testResult.value
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>GraphQL Connection & Debug Test</h1>
      
      {/* Connection Test */}
      <div style={{ 
        background: connection.success ? '#d4edda' : '#f8d7da',
        color: connection.success ? '#155724' : '#721c24',
        padding: '1rem',
        border: `1px solid ${connection.success ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h3>Connection Status: {connection.success ? '✅ Success' : '❌ Failed'}</h3>
        {connection.success ? (
          <div>
            <p><strong>Status:</strong> {'status' in connection ? connection.status : 'N/A'}</p>
            <p><strong>Response:</strong></p>
            <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '12px' }}>
              {'data' in connection ? JSON.stringify(connection.data, null, 2) : 'No data'}
            </pre>
          </div>
        ) : (
          <div>
            <p><strong>Error:</strong> {'error' in connection ? connection.error : 'Unknown error'}</p>
          </div>
        )}
      </div>

      {/* Debug Test */}
      <div style={{ 
        background: debug.success ? '#d4edda' : '#f8d7da',
        color: debug.success ? '#155724' : '#721c24',
        padding: '1rem',
        border: `1px solid ${debug.success ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h3>GraphQL Debug: {debug.success ? '✅ Success' : '❌ Failed'}</h3>
        {debug.success ? (
          <div>
            <details style={{ marginBottom: '1rem' }}>
              <summary><strong>Introspection Query</strong></summary>
              <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '12px', marginTop: '0.5rem' }}>
                {JSON.stringify(debug.introspection, null, 2)}
              </pre>
            </details>
            
            <details style={{ marginBottom: '1rem' }}>
              <summary><strong>Published Blogs Query</strong></summary>
              <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '12px', marginTop: '0.5rem' }}>
                {JSON.stringify(debug.publishedBlogs, null, 2)}
              </pre>
            </details>
            
            <details>
              <summary><strong>All Blogs Query</strong></summary>
              <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '12px', marginTop: '0.5rem' }}>
                {JSON.stringify(debug.allBlogs, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <div>
            <p><strong>Error:</strong> {'error' in debug ? debug.error : 'Unknown error'}</p>
            {'stack' in debug && debug.stack && (
              <details>
                <summary>Stack Trace</summary>
                <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '3px', fontSize: '10px' }}>
                  {debug.stack}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Debugging Information:</h3>
        <ul>
          <li><strong>GraphQL Endpoint:</strong> http://localhost:4001/graphql</li>
          <li><strong>Environment:</strong> {typeof window === 'undefined' ? 'Server' : 'Client'}</li>
        </ul>
      </div>
    </div>
  )
})