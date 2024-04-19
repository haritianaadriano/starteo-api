import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../service/user.service';
import { jwtConstants } from './constant';
import { User } from '../model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async retrieveUser(token: string): Promise<User> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return this.userService.findById(payload.id);
    } catch {
      throw new HttpException("Cannot map user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ email: string; token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      isSubscribed: user.isSubscribed,
      career_path: user.careerPath,
      customization_option: user.customizationOption,
      description: user.description,
      birthdate: user.birthdate,
      username: user.username,
      creation_datetime: user.creationDate,
    };
    return {
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
