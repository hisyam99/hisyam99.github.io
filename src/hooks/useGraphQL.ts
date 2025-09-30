import { useStore, $ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import type { 
  QueryResponse,
  MutationResponse,
  ListVariables
} from '~/types/graphql';

// Simplified query executor for Qwik
export const createQueryExecutor = <TData, TVariables = Record<string, unknown>>(
  query: string
) => {
  return $((variables?: TVariables) => {
    if (isServer) return Promise.resolve(null);

    return fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('auth_token') && {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        })
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    .then(response => response.json())
    .then(result => result.data as TData)
    .catch(error => {
      console.error('GraphQL Error:', error);
      throw error;
    });
  });
};

// Simplified mutation executor for Qwik
export const createMutationExecutor = <TData, TVariables = Record<string, unknown>>(
  mutation: string
) => {
  return $((variables?: TVariables) => {
    if (isServer) return Promise.resolve(null);

    return fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('auth_token') && {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        })
      },
      body: JSON.stringify({
        query: mutation,
        variables
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL Error');
      }
      return result.data as TData;
    })
    .catch(error => {
      console.error('GraphQL Mutation Error:', error);
      throw error;
    });
  });
};

// Simple query state manager
export const useQueryState = <TData>() => {
  const state = useStore<QueryResponse<TData>>({
    data: undefined,
    error: undefined,
    fetching: false,
    stale: false,
  });

  const execute = $(async (queryFn: () => Promise<TData | null>) => {
    state.fetching = true;
    state.error = undefined;

    try {
      const result = await queryFn();
      state.data = result as TData;
      state.fetching = false;
    } catch (error) {
      state.error = error as Error;
      state.fetching = false;
    }
  });

  return { state, execute };
};

// Simple mutation state manager
export const useMutationState = <TData>() => {
  const state = useStore<MutationResponse<TData>>({
    data: undefined,
    error: undefined,
    fetching: false,
  });

  const execute = $(async (mutationFn: () => Promise<TData | null>) => {
    state.fetching = true;
    state.error = undefined;

    try {
      const result = await mutationFn();
      state.data = result as TData;
      state.fetching = false;
      return result;
    } catch (error) {
      state.error = error as Error;
      state.fetching = false;
      throw error;
    }
  });

  return { state, execute };
};

// Pagination helper
export const usePagination = (initialVariables: ListVariables = {}) => {
  const variables = useStore({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'DESC' as const,
    ...initialVariables,
  });

  const setPage = $((page: number) => {
    variables.page = page;
  });

  const setPageSize = $((pageSize: number) => {
    variables.pageSize = pageSize;
    variables.page = 1;
  });

  const setSorting = $((sortBy: string, sortDirection?: 'ASC' | 'DESC') => {
    variables.sortBy = sortBy;
    if (sortDirection) {
      variables.sortDirection = sortDirection as typeof variables.sortDirection;
    } else {
      variables.sortDirection = (variables.sortDirection === 'ASC' ? 'DESC' : 'ASC') as typeof variables.sortDirection;
    }
    variables.page = 1;
  });

  const nextPage = $(() => {
    variables.page += 1;
  });

  const prevPage = $(() => {
    if (variables.page > 1) {
      variables.page -= 1;
    }
  });

  return {
    variables,
    setPage,
    setPageSize,
    setSorting,
    nextPage,
    prevPage,
  };
};

// Loading state management
export const useLoadingState = () => {
  const loadingStates = useStore<Record<string, boolean>>({});

  const setLoading = $((key: string, loading: boolean) => {
    loadingStates[key] = loading;
  });

  const isLoading = (key: string) => loadingStates[key] || false;
  const isAnyLoading = () => Object.values(loadingStates).some(Boolean);

  return {
    loadingStates,
    setLoading,
    isLoading,
    isAnyLoading,
  };
};

// Error handling utilities
export const useErrorHandler = () => {
  const errors = useStore<Record<string, string>>({});

  const setError = $((key: string, error: string | Error | undefined) => {
    if (error) {
      errors[key] = typeof error === 'string' ? error : error.message;
    } else {
      delete errors[key];
    }
  });

  const clearError = $((key: string) => {
    delete errors[key];
  });

  const clearAllErrors = $(() => {
    Object.keys(errors).forEach(key => delete errors[key]);
  });

  const getError = (key: string) => errors[key];
  const hasError = (key: string) => !!errors[key];
  const hasAnyError = () => Object.keys(errors).length > 0;

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    getError,
    hasError,
    hasAnyError,
  };
};

// Simple cache management
export const useSimpleCache = <T>() => {
  const cache = useStore<Record<string, { data: T; timestamp: number }>>({});

  const getCached = (key: string, maxAge = 300000) => { // 5 minutes default
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < maxAge) {
      return cached.data;
    }
    return null;
  };

  const setCache = $((key: string, data: T) => {
    cache[key] = { data, timestamp: Date.now() };
  });

  const clearCache = $((key?: string) => {
    if (key) {
      delete cache[key];
    } else {
      Object.keys(cache).forEach(k => delete cache[k]);
    }
  });

  return {
    cache,
    getCached,
    setCache,
    clearCache,
  };
};