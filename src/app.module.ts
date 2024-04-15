import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbHealthModule } from './module/dummy.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LocalDatabaseModule } from './module/database.module';
import { UserModule } from './module/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomizationModule } from './module/cutomization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LocalDatabaseModule,
    DbHealthModule,
    UserModule,
    AuthModule,
    CustomizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
