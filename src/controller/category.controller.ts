import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoryApi, CreateCategoryApi } from './api/category.rest';
import { CategoryMapper } from './mapper/category.mapper';

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/categories')
  @ApiCreatedResponse({
    description: 'All project categories available',
    type: CategoryApi,
    isArray: true,
  })
  @ApiTags('categories')
  async findCategories(): Promise<CategoryApi[]> {
    const categories = await this.categoryService.findCategories();
    const mappedCategories = await Promise.all(
      categories.map((category) =>
        this.categoryMapper.fromDomainToRest(category),
      ),
    );
    return mappedCategories;
  }

  @UseGuards(AuthGuard)
  @Post('/categories')
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: CategoryApi,
  })
  @ApiBody({
    type: CreateCategoryApi,
  })
  @ApiTags('categories')
  async saveCategory(
    @Body() categoryApi: CreateCategoryApi,
  ): Promise<CategoryApi> {
    const category = await this.categoryService.saveCategory(categoryApi);
    const mappedCategory = this.categoryMapper.fromDomainToRest(category);
    
    return mappedCategory;
  }
}
