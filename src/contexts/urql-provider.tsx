import { 
  component$, 
  createContextId, 
  useContextProvider, 
  useContext, 
  Slot, 
  useStore,
  useTask$
} from '@builder.io/qwik';
import type { Client } from 'urql';
import { createUrqlClient } from '~/lib/urql-client';
import { isServer } from '@builder.io/qwik/build';

// URQL Context
export const UrqlContextId = createContextId<{
  client: Client | null;
  isReady: boolean;
}>('urql-context');

// URQL Provider Component
export const UrqlProvider = component$(() => {
  const urqlState = useStore<{
    client: Client | null;
    isReady: boolean;
  }>({
    client: null,
    isReady: false,
  });

  // Initialize URQL client on client-side
  useTask$(() => {
    if (!isServer && typeof window !== 'undefined') {
      try {
        urqlState.client = createUrqlClient();
        urqlState.isReady = true;
      } catch (error) {
        console.error('Failed to create URQL client:', error);
        urqlState.isReady = false;
      }
    }
  });

  // Provide the URQL context
  useContextProvider(UrqlContextId, {
    client: urqlState.client,
    isReady: urqlState.isReady,
  });

  return <Slot />;
});

// Hook to use URQL context
export const useUrqlClient = () => {
  const context = useContext(UrqlContextId);
  
  if (!context) {
    throw new Error('useUrqlClient must be used within UrqlProvider');
  }
  
  return context;
};

// Helper hook to get the client (with null check)
export const useUrqlClientSafe = () => {
  const context = useContext(UrqlContextId);
  return context?.client || null;
};
