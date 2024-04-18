import { Inject, Injectable } from '@nestjs/common';
import { Donation } from '../../model/donation.entity';
import { DonationApi } from '../api/donation.rest';
import { UserMapper } from './user.mapper';

@Injectable()
export class DonationMapper {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async fromDomainToRest(donation: Donation): Promise<DonationApi> {
    const donationApi = new DonationApi();
    donationApi.amount = donation.amount;
    donationApi.creation_date = donation.creationDate;
    donationApi.user = await this.userMapper.fromDomainToRest(
      donation.project.user,
    );
    return donationApi;
  }
}
