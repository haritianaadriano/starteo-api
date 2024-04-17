import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from '../model/donation.entity';
import { ProjectModule } from './project.module';
import { DonationService } from '../service/donation.service';
import { UserModule } from './user.module';
import { DonationController } from '../controller/donation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), ProjectModule, UserModule],
  providers: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
