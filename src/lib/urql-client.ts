import {
  createClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
  errorExchange,
  type Client,
  type OperationResult,
  type Exchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { createClient as createWSClient } from 'graphql-ws';
import { isServer } from '@builder.io/qwik/build';
import { map, pipe } from 'wonka';

// GraphQL endpoint configuration
const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql';
const WS_ENDPOINT = import.meta.env.VITE_GRAPHQL_WS_ENDPOINT || 'ws://localhost:4001/graphql';

// Create WebSocket client for subscriptions (client-side only)
const wsClient = !isServer
  ? createWSClient({
      url: WS_ENDPOINT,
      connectionParams: () => {
        const token = getAuthToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    })
  : null;

// Helper functions for token management
function getAuthToken(): string | null {
  if (isServer) return null;
  return localStorage.getItem('auth_token');
}

function getRefreshToken(): string | null {
  if (isServer) return null;
  return localStorage.getItem('refresh_token');
}

function setAuthTokens(tokens: { accessToken: string; refreshToken: string; expiresIn: number }) {
  if (isServer) return;
  
  const expiresAt = Date.now() + tokens.expiresIn * 1000;
  
  localStorage.setItem('auth_token', tokens.accessToken);
  localStorage.setItem('refresh_token', tokens.refreshToken);
  localStorage.setItem('token_expires_at', expiresAt.toString());
}

function clearAuthTokens() {
  if (isServer) return;
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token_expires_at');
}

function isTokenExpired(): boolean {
  if (isServer) return false;
  
  const expiresAtStr = localStorage.getItem('token_expires_at');
  if (!expiresAtStr) return true;
  
  const expiresAt = parseInt(expiresAtStr, 10);
  return Date.now() >= expiresAt - 60000; // 1 minute buffer
}

// Custom auth exchange
const authExchange: Exchange = ({ forward }) => {
  return operations$ => {
    return pipe(
      operations$,
      map(operation => {
        const token = getAuthToken();
        
        if (!token) return operation;
        
        const fetchOptions = typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {};

        return {
          ...operation,
          context: {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...(fetchOptions.headers || {}),
                Authorization: `Bearer ${token}`,
              },
            },
          },
        };
      }),
      forward,
    );
  };
};

// Create URQL client
export const createUrqlClient = (): Client => {
  const exchanges = [
    // Development tools (only in dev)
    ...(import.meta.env.DEV ? [devtoolsExchange] : []),
    
    // Error handling
    errorExchange({
      onError: (error, operation) => {
        console.error('GraphQL Error:', error);
        
        // Handle specific error types
        if (error.graphQLErrors.some(e => e.extensions?.code === 'UNAUTHENTICATED')) {
          clearAuthTokens();
          // Optionally redirect to login
          if (!isServer && window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      },
    }),

    // Authentication
    authExchange,

    // Caching (with smart invalidation)
    cacheExchange,

    // Subscriptions (client-side only)
    ...(wsClient
      ? [
          subscriptionExchange({
            forwardSubscription(request) {
              const input = { ...request, query: request.query || '' };
              return {
                subscribe(sink) {
                  const unsubscribe = wsClient.subscribe(input, sink);
                  return { unsubscribe };
                },
              };
            },
          }),
        ]
      : []),

    // HTTP transport
    fetchExchange,
  ];

  return createClient({
    url: GRAPHQL_ENDPOINT,
    exchanges,
    // Request policy for better caching
    requestPolicy: 'cache-first',
  });
};

// Global client instance
let globalClient: Client | null = null;

export const getUrqlClient = (): Client => {
  if (!globalClient) {
    globalClient = createUrqlClient();
  }
  return globalClient;
};

// Helper functions for auth
export const authHelpers = {
  setTokens: setAuthTokens,
  clearTokens: clearAuthTokens,
  getToken: getAuthToken,
  getRefreshToken,
  isAuthenticated: (): boolean => !!getAuthToken(),
};

// Re-export useful types
export type { Client, OperationResult };