import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Dummy } from './model/dummy.entity';
import { CreateDummy1712500758914 } from './migrations/1712500758914-CreateDummy';
import { User } from './model/user.entity';
import { Customization } from './model/customization.entity';
import { CreateUser1713183354964 } from './migrations/1713183354964-CreateUser';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [Dummy, User, Customization],
  // Order by creation time
  migrations: [CreateDummy1712500758914, CreateUser1713183354964],
  migrationsRun: true,
  synchronize: false,
});
