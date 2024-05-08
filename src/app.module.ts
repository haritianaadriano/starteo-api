import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbHealthModule } from './module/dummy.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LocalDatabaseModule } from './module/database.module';
import { UserModule } from './module/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './module/project.module';
import { DonationModule } from './module/donation.module';
import { CategoryModule } from './module/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DbHealthModule,
    UserModule,
    AuthModule,
    ProjectModule,
    DonationModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
