import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../model/project.entity';
import { ProjectService } from '../service/project.service';
import { ProjectController } from '../controller/project.controller';
import { UserModule } from './user.module';
import { ProjectMapper } from '../controller/mapper/project.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectMapper],
  exports: [ProjectService],
})
export class ProjectModule {}
