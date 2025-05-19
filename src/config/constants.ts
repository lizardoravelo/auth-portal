const roles = ['user', 'admin'] as const;
export type Role = (typeof roles)[number];

interface FrontendConfig {
  app: string;
  env: string;
  hostname: string;
  auth: {
    domain: string;
    clientId: string;
    audience: string;
    namespace: string;
  };
  roles: readonly Role[];
}

const config: FrontendConfig = {
  app: import.meta.env.VITE_APP ?? '',
  env: import.meta.env.MODE ?? '',
  hostname: import.meta.env.VITE_HOSTNAME ?? window.location.origin,
  auth: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN ?? '',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? '',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE ?? '',
    namespace: import.meta.env.VITE_AUTH0_NAMESPACE ?? '',
  },
  roles,
};

export default config;
