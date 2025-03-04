import React from 'react';
import { StreamProvider } from '@contexts/StreamContext';

interface AppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <StreamProvider>
      <Component {...pageProps} />
    </StreamProvider>
  );
}

export default App;
