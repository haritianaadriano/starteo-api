import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async retrieveUser(token: string): Promise<{ user: User; bearer: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const toBearer = {
        id: payload.id,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        isSubscribed: payload.isSubscribed,
        career_path: payload.careerPath,
        customization_option: payload.customizationOption,
        description: payload.description,
        birthdate: payload.birthdate,
        username: payload.username,
        creation_datetime: payload.creationDate,
        phone_number: payload.phone_number,
      };

      return {
        user: await this.userService.findById(payload.id),
        bearer: await this.jwtService.signAsync(toBearer),
      };
    } catch {
      throw new HttpException(
        'Cannot map user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      email: user.email,
      isSubscribed: user.isSubscribed,
      career_path: user.careerPath,
      customization_option: user.customizationOption,
      description: user.description,
      birthdate: user.birthdate,
      username: user.username,
      creation_datetime: user.creationDate,
      phone_number: user.phoneNumer,
    };
    return {
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
