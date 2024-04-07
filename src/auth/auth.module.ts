import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../module/user.module';
import { jwtConstants } from './constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMapper } from '../controller/mapper/user.mapper';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserMapper],
})
export class AuthModule {}
