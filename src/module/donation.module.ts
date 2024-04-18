import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../model/donation.entity';
import { ProjectModule } from './project.module';
import { DonationService } from '../service/donation.service';
import { UserModule } from './user.module';
import { DonationController } from '../controller/donation.controller';
import { DonationMapper } from '../controller/mapper/donation.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), ProjectModule, UserModule],
  providers: [DonationService, DonationMapper],
  controllers: [DonationController],
  exports: [DonationService],
})
export class DonationModule {}
