import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Dummy } from './model/dummy.entity';
import { CreateDummy1712500758914 } from './migrations/1712500758914-CreateDummy';
import { User } from './model/user.entity';
import { CreateUser1713183354964 } from './migrations/1713183354964-CreateUser';

config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Dummy, User],
  // Order by creation time
  migrations: [CreateDummy1712500758914, CreateUser1713183354964],
  migrationsRun: true,
  synchronize: false,
});
