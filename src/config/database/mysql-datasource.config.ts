import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
<<<<<<< HEAD
<<<<<<< HEAD
  port: 3306,//porta do MySql Workbench - porta do finan-APi do professor é 3360
  username: 'root',
  password: 'root',
  database: 'despesas',
=======
<<<<<<< HEAD
=======
>>>>>>> pedro
  port: 3306,
  username: 'root2',
  password: 'root2',
  database: 'biblioteca_online_db',
<<<<<<< HEAD
=======
  port: 3360,
  username: 'root',
  password: 'root',
  database: 'test_db',
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
>>>>>>> ac9119dd743cf3de9878c38f91c11700b461f723
=======
>>>>>>> pedro
  synchronize: false,
  logging: false,
  entities: ['src/api/components/**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});
>>>>>>> fd226ba9acf162aeff38c68f0f99fa272c207b20
=======
});
>>>>>>> pedro
