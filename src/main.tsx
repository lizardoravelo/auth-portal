import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { providerConfig } from '@config/auth_config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
  </StrictMode>
);
