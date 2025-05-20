import config from '@config/constants';
import type { AppState, CacheLocation } from '@auth0/auth0-react';

export function getConfig() {
  const { domain, clientId, audience } = config.auth;

  return {
    domain,
    clientId,
    ...(audience ? { audience } : {}),
  };
}

const onRedirectCallback = (appState?: AppState) => {
  // Cleans up URL and restores path
  const target = appState?.returnTo ?? window.location.pathname;
  window.history.replaceState({}, document.title, target);
};

const isProd = window.location.hostname.includes('github.io');

export const providerConfig = {
  ...getConfig(),
  onRedirectCallback,
  cacheLocation: 'localstorage' as CacheLocation,
  useRefreshTokens: true,
  useRefreshTokensFallback: true,
  authorizationParams: {
    redirect_uri: isProd
    ? `${window.location.origin}/${config.app}`
    : window.location.origin,
    ...(config.auth.audience ? { audience: config.auth.audience } : {}),
  },
};
