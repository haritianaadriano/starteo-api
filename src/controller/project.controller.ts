import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ProjectService } from '../service/project.service';
import { CreateProjectApi, ProjectApi } from './api/project.rest';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from './queries/pagination.query';
import { ProjectMapper } from './mapper/project.mapper';

@Controller()
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly projectMapper: ProjectMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/projects')
  @ApiCreatedResponse({
    description: 'Projects found',
    type: ProjectApi,
    isArray: true,
  })
  @ApiTags('projects')
  async findProjects(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<ProjectApi[]> {
    const projects = await this.projectService.findProjects(paginationQuery);
    const mappedProjects = await Promise.all(
      projects.map((project) => this.projectMapper.fromDomainToRest(project)),
    );
    return mappedProjects;
  }

  @UseGuards(AuthGuard)
  @Get('/projects/:project_id')
  @ApiCreatedResponse({
    description: 'Project found',
    type: ProjectApi,
  })
  @ApiTags('projects')
  async findProjectById(
    @Param('project_id') projectId: string,
  ): Promise<ProjectApi> {
    return this.projectMapper.fromDomainToRest(
      await this.projectService.findById(projectId),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/users/:user_id/projects')
  @ApiCreatedResponse({
    description: 'Projects found from given user',
    type: ProjectApi,
    isArray: true,
  })
  @ApiTags('projects')
  async findUserProjects(
    @Param('user_id') userId: string,
    @Query() pagination: PaginationQuery,
  ): Promise<ProjectApi[]> {
    const projects = await this.projectService.findProjectsByUserId(
      pagination,
      userId,
    );
    const mappedProjects = await Promise.all(
      projects.map((project) => this.projectMapper.fromDomainToRest(project)),
    );
    return mappedProjects;
  }

  @UseGuards(AuthGuard)
  @Put('/users/:user_id/projects')
  @ApiCreatedResponse({
    description: 'Projects created',
    type: ProjectApi,
    isArray: true,
  })
  @ApiBody({
    isArray: true,
    type: CreateProjectApi,
  })
  @ApiTags('projects')
  async saveUserProjects(
    @Param('user_id') userId: string,
    @Body() projectsApi: CreateProjectApi[],
  ): Promise<ProjectApi[]> {
    const projects = await this.projectService.saveProjects(
      projectsApi,
      userId,
    );
    const mappedProjects = await Promise.all(
      projects.map((project) => this.projectMapper.createdRest(project)),
    );
    return mappedProjects;
  }
}
