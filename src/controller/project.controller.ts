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
      projects.map((project) => this.projectMapper.fromDomainToRest(project)),
    );
    return mappedProjects;
  }
}
