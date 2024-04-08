import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from '../model/dummy.entity';
import { User } from '../model/user.entity';
import { CreateDummy1712500758914 } from '../migrations/1712500758914-CreateDummy';
import { CreateUser1712506270507 } from '../migrations/1712506270507-CreateUser';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Dummy, User],
        synchronize: true,
        migrationsRun: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
