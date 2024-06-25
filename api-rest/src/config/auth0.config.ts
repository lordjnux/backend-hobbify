import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: './.env.development.local' });

export const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

export const Auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: baseUrl,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
};
