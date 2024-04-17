import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ProjectService } from '../service/project.service';
import { ProjectApi } from './api/project.rest';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from './queries/pagination.query';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
    //TODO: integrate this service with the actual
    return [];
  }
}
