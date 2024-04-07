import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from './model/dummy.entity';
import { DbHealthModule } from './module/dummy.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'milamibosy',
      database: 'blog',
      entities: [Dummy],
      migrations: ['build/task/migrations/*.ts'],
      migrationsTableName: "task_migrations",
      synchronize: false,
    }),
    DbHealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
