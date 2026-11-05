import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store}>
          <App />
          <Toaster position="top-right" richColors />
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
