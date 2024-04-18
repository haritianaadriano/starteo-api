import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';
import { UserService } from './user.service';
import { CreateProjectApi } from '../controller/api/project.rest';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async saveProjects(
    projects: CreateProjectApi[],
    userId: string,
  ): Promise<Project[]> {
    projects.forEach((project) =>
      this.validateUserPathAndPayload(project, userId),
    );
    return this.projectRepository.save(await this.fromCreateToDomain(projects));
  }

  async findProjects(pagination: PaginationQuery): Promise<Project[]> {
    if (pagination.page === 0 || pagination.page === undefined) {
      throw new HttpException('page required', HttpStatus.BAD_REQUEST);
    }

    if (pagination.page_size === 0 || pagination.page_size === undefined) {
      throw new HttpException('page_size required', HttpStatus.BAD_REQUEST);
    }

    const { page, page_size } = pagination;
    const skip = (page - 1) * page_size;

    return this.projectRepository.find({
      relations: {
        user: true,
      },
      take: page_size,
      skip,
    });
  }

  async findById(id: string): Promise<Project> {
    return this.projectRepository.findOneById(id);
  }

  async fromCreateToDomain(create: CreateProjectApi[]): Promise<Project[]> {
    return Promise.all(
      create.map((project) => {
        return this.mapCreateToDomain(project);
      }),
    );
  }

  async mapCreateToDomain(create: CreateProjectApi): Promise<Project> {
    const projectDomain = new Project();

    projectDomain.description = create.description;
    projectDomain.title = create.title;
    projectDomain.user = await this.userService.findById(create.user_id);
    return await projectDomain;
  }

  validateUserPathAndPayload(payload: CreateProjectApi, userId: string) {
    if (payload.user_id != userId) {
      throw new HttpException(
        'User path doesn t match to user payload',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
