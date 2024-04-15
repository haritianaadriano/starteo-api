import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customization } from '../model/customization.entity';
import { CustomizationService } from '../service/customization.service';
import { CustomizationMapper } from '../controller/mapper/customization.mapper';
import { UserModule } from './user.module';
import { CustomizationController } from '../controller/customization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customization]), UserModule],
  providers: [CustomizationService, CustomizationMapper],
  controllers: [CustomizationController],
  exports: [CustomizationService],
})
export class CustomizationModule {}
