'use client';

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';

const { ToastContainer } = createStandaloneToast();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        {children}
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  );
}
