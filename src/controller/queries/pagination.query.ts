import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({
    minimum: 1,
    title: 'page',
    format: 'int32',
    default: 1,
  })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    maximum: 10,
    title: 'page_size',
    format: 'int32',
  })
  @IsInt()
  @Max(50)
  page_size: number;
}
