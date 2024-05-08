import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../model/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryApi } from 'src/controller/api/category.rest';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async saveCategory(
    categoryToSave: CreateCategoryApi,
  ): Promise<Category | undefined> {
    const toSave = this.mapCreateToDomain(categoryToSave);

    return this.categoryRepository.save(toSave);
  }

  mapCreateToDomain(createCategory: CreateCategoryApi): Category {
    const categoryDomain = new Category();

    categoryDomain.description = createCategory.description;
    categoryDomain.field = categoryDomain.field;
    return categoryDomain;
  }
}
