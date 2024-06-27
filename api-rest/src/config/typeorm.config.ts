import { registerAs } from '@nestjs/config';
import { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } from './envs';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: [],
  migrations: [],
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  // dropSchema: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
