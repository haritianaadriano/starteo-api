import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

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
}
