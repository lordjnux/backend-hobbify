import { config } from 'dotenv';
config({ path: './.env.development.local' });

export const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } =
  process.env;
