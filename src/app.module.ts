import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbHealthModule } from './module/dummy.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './module/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, DbHealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
