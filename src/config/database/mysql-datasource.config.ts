import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
<<<<<<< HEAD
  port: 3306,
  username: 'root2',
  password: 'root2',
  database: 'biblioteca_online_db',
=======
  port: 3360,
  username: 'root',
  password: 'root',
  database: 'test_db',
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
  synchronize: false,
  logging: false,
  entities: ['src/api/components/**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
<<<<<<< HEAD
});
=======
});
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
