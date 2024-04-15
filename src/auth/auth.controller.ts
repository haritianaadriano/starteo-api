import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../service/user.service';
import { UserMapper } from '../controller/mapper/user.mapper';
import { Public } from '../module/decorator/public-access.decorator';
import { SignupApi } from '../controller/api/signup.rest';
import { SignInApi } from '../controller/api/signin.rest';
import { TokenApi } from '../controller/api/token.rest';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserApi } from '../controller/api/user.rest';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Public()
  @Post('/signin')
  @ApiCreatedResponse({
    description: 'Token provided',
    type: TokenApi,
  })
  signIn(@Body() signIn: SignInApi): Promise<TokenApi> {
    return this.authService.signIn(signIn.email, signIn.password);
  }

  @Public()
  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User created',
    type: UserApi,
  })
  signUp(@Body() toCreate: SignupApi): Promise<UserApi> {
    const user = this.userMapper.signupApiToDomain(toCreate);
    const userToRest = this.userService.saveUser(user);
    return this.userMapper.toRest(userToRest);
  }
}
