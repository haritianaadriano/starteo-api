import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../model/category.entity';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { CategoryMapper } from '../controller/mapper/category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryMapper],
})
export class CategoryModule {}
