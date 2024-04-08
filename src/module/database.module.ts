import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from '../model/dummy.entity';
import { User } from '../model/user.entity';

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
