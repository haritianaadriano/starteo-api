import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guards';
import { DonationApi } from './api/donation.rest';

@Controller()
export class DonationController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('/projects/:project_id/donations')
  @ApiCreatedResponse({
    description: 'Projects found',
    type: DonationApi,
    isArray: true,
  })
  @ApiTags('projects')
  async findDonations(): Promise<DonationApi[]> {
    //TODO: integrate this service with the actual
    return [];
  }
}
