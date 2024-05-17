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
import { CreateProjectApi } from './../src/controller/api/project.rest';

// UTILS
let httpServer;
let whoamiBody;
let me;
let createdProject;

let createProjectBody = new CreateProjectApi();
createProjectBody.title = 'Create Project via test';
createProjectBody.description = 'Created project description';

describe('ProjectController (e2e)', () => {
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

    me = (await request(httpServer).post('/auth/signup').send(signupBody)).body;
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

  it('PUT: /users/:userId/projects', async () => {
    createProjectBody.user_id = me.id;

    createdProject = await request(httpServer)
      .put(`/users/${me.id}/projects`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .send([createProjectBody])
      .expect(200);

    expect(createdProject.body).not.toBeNull();
    expect(createdProject.body[0].title).toBe(createProjectBody.title);
    expect(createdProject.body[0].description).toBe(
      createProjectBody.description,
    );
  });

  it('GET: /projects (400)', async () => {
    await request(httpServer)
      .get('/projects')
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(400);
  });

  it('GET: /projects', async () => {
    const page = 1;
    const page_size = 10;
    const res = await request(httpServer)
      .get(`/projects?page=${page}&page_size=${page_size}`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(200);

    expect(res.body).not.toBeNull();
    expect(res.body).toContainEqual(createdProject.body[0]);

    //Handle error
    await request(httpServer)
      .get(`/projects?page=${page}`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(400);
  });

  it('GET: /projects/:projectId', async () => {
    const res = await request(httpServer)
      .get(`/projects/${createdProject.body[0].id}`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(200);

    expect(res.body).not.toBeNull();
    expect(res.body).toStrictEqual(createdProject.body[0]);
  });

  it('GET: /users/:userId/projects', async () => {
    const res = await request(httpServer)
      .get(`/users/${me.id}/projects?page=1&page_size=10`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(200);

    expect(res.body).toContainEqual(createdProject.body[0]);

    //Handle error
    await request(httpServer)
      .get(`/projects?page=1}`)
      .set('Authorization', `Bearer ${whoamiBody.token}`)
      .expect(400);
  });
});
