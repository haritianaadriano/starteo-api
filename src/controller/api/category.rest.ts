import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryApi {
  @ApiProperty()
  field: string;

  @ApiProperty()
  description: string;

  constructor() {}
}

export class CategoryApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  field: string;

  constructor() {}
}
