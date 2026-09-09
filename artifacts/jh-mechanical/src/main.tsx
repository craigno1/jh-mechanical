import { createRoot, hydrateRoot } from 'react-dom/client';
import type { ErrorInfo } from 'react';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const container = document.getElementById('root')!;
const options = {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error: unknown, errorInfo: ErrorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
};
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app, options);
} else {
  createRoot(container, options).render(app);
}
