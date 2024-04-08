import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Dummy } from './../src/model/dummy.entity';
import { User } from './../src/model/user.entity';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { DbHealthModule } from './../src/module/dummy.module';
import { UserModule } from './../src/module/user.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';

describe('DbHealthController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let container: StartedPostgreSqlContainer;
  jest.setTimeout(60000);

  beforeAll(async () => {
    container = await new PostgreSqlContainer()
      .withPassword('password')
      .withDatabase('database')
      .withUsername('postgres')
      .start();

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return {
              type: 'postgres',
              url: container.getConnectionUri(),
              entities: [Dummy, User],
              synchronize: true,
            };
          },
        }),

        AuthModule,
        DbHealthModule,
        UserModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
  });

  it('/health/db (GET)', () => {
    return request(app.getHttpServer())
      .get('/health/db')
      .expect(200)
      .expect('OK');
  });
});
