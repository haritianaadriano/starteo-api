import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationQuery } from '../../controller/queries/pagination.query';

export const validate = (pagination: PaginationQuery) => {
  if (pagination.page === 0 || pagination.page === undefined) {
    throw new HttpException('page required', HttpStatus.BAD_REQUEST);
  }

  if (pagination.page_size === 0 || pagination.page_size === undefined) {
    throw new HttpException('page_size required', HttpStatus.BAD_REQUEST);
  }
};
