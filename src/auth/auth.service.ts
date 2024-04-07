import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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
    };
    return {
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
