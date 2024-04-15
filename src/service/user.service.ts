import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsers(pagination: PaginationQuery): Promise<User[]> {
    if(pagination.page === 0 || pagination.page === undefined) {
      throw new HttpException('page required', HttpStatus.BAD_REQUEST);
    }

    if(pagination.page_size === 0 || pagination.page_size === undefined) {
      throw new HttpException('page_size required', HttpStatus.BAD_REQUEST);
    }

    const { page, page_size } = pagination;
    const skip = (page - 1) * page_size;

    return this.userRepository.find({
      take: page_size,
      skip
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email as string });
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneById(id);
  }
}
