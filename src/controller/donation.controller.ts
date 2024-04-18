import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guards';
import { CreateDonationApi, DonationApi } from './api/donation.rest';
import { DonationService } from '../service/donation.service';
import { DonationMapper } from './mapper/donation.mapper';

@Controller()
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly donationMapper: DonationMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/projects/:project_id/donations')
  @ApiCreatedResponse({
    description: 'Donations of project found',
    type: DonationApi,
    isArray: true,
  })
  @ApiTags('projects')
  async findDonations(
    @Param('project_id') projectId: string,
  ): Promise<DonationApi[]> {
    const donations =
      await this.donationService.findDonationsByProjectById(projectId);
    const mappedDonations = await Promise.all(
      donations.map((donation) =>
        this.donationMapper.fromDomainToRest(donation),
      ),
    );
    return mappedDonations;
  }

  @UseGuards(AuthGuard)
  @Post('/projects/:project_id/donations')
  @ApiCreatedResponse({
    description: 'Donation of project created',
    type: DonationApi,
    isArray: true,
  })
  @ApiBody({
    isArray: true,
    type: CreateDonationApi,
  })
  @ApiTags('projects')
  async saveDonationProject(
    @Param('project_id') projectId: string,
    @Body() toSave: CreateDonationApi[],
  ) {
    const donations = await this.donationService.saveDonations(toSave);
    const mappedDonations = await Promise.all(
      donations.map((donation) =>
        this.donationMapper.fromDomainToRest(donation),
      ),
    );
    return mappedDonations;
  }
}
