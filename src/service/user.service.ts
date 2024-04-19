import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';
import { validate } from './validator/pagination.validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsers(pagination: PaginationQuery): Promise<User[]> {
    validate(pagination);

    const { page, page_size } = pagination;
    const skip = (page - 1) * page_size;

    return this.userRepository.find({
      take: page_size,
      skip,
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
