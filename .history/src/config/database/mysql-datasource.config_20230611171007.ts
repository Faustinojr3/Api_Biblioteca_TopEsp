import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,//porta do MySql Workbench - porta do API
  username: 'root',
  password: 'root',
  database: 'despesas',
  synchronize: false,
  logging: false,
  entities: ['src/api/components/**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
});
