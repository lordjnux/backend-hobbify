import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env.development.local' });

const config = {
  type: 'postgres',
  url: process.env.POSTGRESDB_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: false,
  logging: true,
<<<<<<< HEAD
  synchronize: true,
  dropSchema: true,
=======
  synchronize: false,
  dropSchema: false,
>>>>>>> 7e501cd2e5886239fe2a280b12ece4cf5c88c5b5
  ssl: {
    rejectUnauthorized: false,
  },
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
