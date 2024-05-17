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
import { signinBody, signupBody } from './utils/http.body';
import { CategoryModule } from './../src/module/category.module';
import { Category } from './../src/model/category.entity';
import { Project } from './../src/model/project.entity';
import { postgresContainer } from './utils/postgres.container';
import { ProjectModule } from './../src/module/project.module';
import { DonationModule } from './../src/module/donation.module';
import { Donation } from './../src/model/donation.entity';
import { DbHealthModule } from './../src/module/dummy.module';
import { createProjectBody } from './project.e2e-spec';
import { CreateDonationApi } from './../src/controller/api/donation.rest';

//UTILS
let httpServer;
let whoamiBody;
let me;
let createdProject;
let createdDonation;

let createDonationBody = new CreateDonationApi();
createDonationBody.amount = 400000000;
createProjectBody.description = 'Create a donation';

describe('DonationController (e2e)', () => {
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
              entities: [Dummy, User, Category, Project, Donation, Dummy],
              synchronize: true,
            };
          },
        }),

        AuthModule,
        CategoryModule,
        ProjectModule,
        DonationModule,
        DbHealthModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    me = (await request(httpServer).post('/auth/signup').send(signupBody)).body;
    whoamiBody = (
      await request(httpServer).post('/auth/signin').send(signinBody)
    ).body;
    createdProject = (
      await request(httpServer)
        .put(`/users/${me.id}/projects`)
        .set('Authorization', `Bearer ${whoamiBody.token}`)
        .send([createProjectBody])
        .expect(200)
    ).body;
  });

  afterAll(async () => {
    await module.close();
    if (container) {
      await container.stop();
    }
  });

  it('POST: /projects/:projectId/donations', async () => {
    createDonationBody.project_id = createdProject.body.id;
    createDonationBody.user_id = me.id;

    createdDonation = await request(httpServer)
      .post(`/projects/${createdProject.id}/donations`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .send([createDonationBody]);
  });

  it('GET: /projects/:projectId/donations', async () => {
    const res = await request(httpServer)
      .get(`/projects/${createdProject.id}/donations`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(200);

    expect(res.body).not.toBeNull();
  });
});
