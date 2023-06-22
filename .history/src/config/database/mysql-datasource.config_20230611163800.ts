import 'reflect-metadata';
import { Da } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3,
  username: 'root',
  password: 'root',
  database: 'test_db',
  synchronize: false,
  logging: false,
  entities: ['src/api/components/**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
});
