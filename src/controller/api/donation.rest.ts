import { ApiProperty } from '@nestjs/swagger';
import { UserApi } from './user.rest';

export class CreateDonation {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  amount: number;
}

export class DonationApi {
  @ApiProperty()
  user: UserApi;

  @ApiProperty()
  amount: number;
}
