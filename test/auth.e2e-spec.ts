import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Dummy } from './../src/model/dummy.entity';
import { User } from './../src/model/user.entity';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { DbHealthModule } from './../src/module/dummy.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { signinBody, signupBody } from './utils/http.body';
import { postgresContainer } from './utils/postgres.container';

// UTILS
let httpServer;
const userRegistrationPayloadFailed = {
  firstname: 'Adriano',
  lastname: 'Haritiana',
  email: 'pro1@gmail.com',
  username: 'haritianaadriano',
  password: 'passwd',
  birthdate: '2024-05-08T12:17:10.145Z',
  description: 'string',
  career_path: 'string',
};

describe('AuthController (e2e)', () => {
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
        DbHealthModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
  });

  //TEST: auth e2e testing
  //Each test is ordered by code lines
  it('POST: /auth/signup', async () => {
    const res = await request(httpServer)
      .post('/auth/signup')
      .send(signupBody)
      .expect(201);

    expect(res.body.firstname).toBe(signupBody.firstname);
    expect(res.body.lastname).toBe(signupBody.lastname);
    expect(res.body.email).toBe(signupBody.email);
    expect(res.body.username).toBe(signupBody.username);
    expect(res.body.customization_option).toBe(signupBody.customization_option);
    expect(res.body.birthdate).toBe(signupBody.birthdate);
    expect(res.body.career_path).toBe(signupBody.career_path);
  });

  it('POST: /auth/signup (400)', async () => {
    await request(httpServer)
      .post('/auth/signup')
      .send(userRegistrationPayloadFailed)
      .expect(400);
  });

  it('POST: /auth/signin', async () => {
    const res = await request(httpServer)
      .post('/auth/signin')
      .send(signinBody)
      .expect(201);

    expect(res.body.email).toBe(signinBody.email);
    expect(res.body.token).not.toBeNull();
  });
});
