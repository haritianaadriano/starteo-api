import { Inject, Injectable } from '@nestjs/common';
import { ProjectApi } from '../api/project.rest';
import { Project } from '../../model/project.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class ProjectMapper {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async fromDomainToRest(project: Project): Promise<ProjectApi> {
    const projectApi = new ProjectApi();
    projectApi.description = project.description;
    projectApi.donation_collected = project.donationCollected;
    projectApi.id = project.id;
    projectApi.creation_datetime = project.creationDate;
    projectApi.title = project.title;
    projectApi.user = await this.userMapper.fromDomainToRest(project.user);
    return projectApi;
  }

  async toRest(promiseProject: Promise<Project>): Promise<ProjectApi> {
    const projectApi = new ProjectApi();
    const project = await promiseProject;

    projectApi.description = project.description;
    projectApi.donation_collected = project.donationCollected;
    projectApi.id = project.id;
    projectApi.creation_datetime = project.creationDate;
    projectApi.title = project.title;
    projectApi.user = await this.userMapper.fromDomainToRest(project.user);
    return projectApi;
  }
}
