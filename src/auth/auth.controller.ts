import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../service/user.service';
import { UserMapper } from '../controller/mapper/user.mapper';
import { Public } from '../module/decorator/public-access.decorator';
import { SignupApi } from '../controller/api/signup.rest';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Public()
  @Post('/signin')
  signIn(@Body() signIn: Record<string, any>) {
    return this.authService.signIn(signIn.email, signIn.password);
  }

  @Public()
  @Post('/signup')
  signUp(@Body() toCreate: SignupApi) {
    let user = this.userMapper.signupApiToDomain(toCreate);
    let userToRest = this.userService.saveUser(user);
    return this.userMapper.toRest(userToRest);
  }
}
