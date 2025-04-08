import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App.tsx';
import './index.css';
import { PostHogProvider } from 'posthog-js/react'

function Root() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <App />;
  }

  return (
    <PostHogProvider 
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} 
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      }}
    >
      <App />
    </PostHogProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);