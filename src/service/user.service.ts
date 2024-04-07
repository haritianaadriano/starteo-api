import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email as string });
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }
}
