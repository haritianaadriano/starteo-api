import { Category } from '../../model/category.entity';
import { CategoryApi } from '../api/category.rest';

export class CategoryMapper {
  constructor() {}

  async fromDomainToRest(category: Category): Promise<CategoryApi> {
    const categoryApi = new CategoryApi();

    categoryApi.id = category.id;
    categoryApi.description = category.description;
    categoryApi.field = category.field;
    return categoryApi;
  }
}
