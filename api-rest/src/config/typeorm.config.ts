import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env.development.local' });

const config = {
  type: 'postgres',
  url: process.env.POSTGRESDB_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: true,
  synchronize: true,
  dropSchema: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
