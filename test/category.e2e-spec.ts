import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Dummy } from './../src/model/dummy.entity';
import { User } from './../src/model/user.entity';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { createCategoryBody, signinBody, signupBody } from './utils/http.body';
import { postgresContainer } from './utils/postgres.container';
import { CategoryModule } from './../src/module/category.module';

// UTILS
let httpServer;
let whoamiBody;

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let container: StartedPostgreSqlContainer;
  jest.setTimeout(60000);

  beforeAll(async () => {
    container = await postgresContainer();

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
        CategoryModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    await request(httpServer).post('/auth/signup').send(signupBody);
    whoamiBody = (
      await request(httpServer).post('/auth/signin').send(signinBody)
    ).body;
  });

  afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
  });

  //TEST: category e2e testing
  it('POST: /categories', async () => {
    const res = await request(httpServer)
      .post('/categories')
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .send(createCategoryBody)
      .expect(201);

    expect(res.body.field).toBe(createCategoryBody.field);
    expect(res.body.description).toBe(createCategoryBody.description);
  });
});
