import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../model/donation.entity';
import { Repository } from 'typeorm';
import { CreateDonation } from '../controller/api/donation.rest';
import { UserService } from './user.service';
import { ProjectService } from './project.service';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ProjectService)
    private readonly projectService: ProjectService,
  ) {}

  async findDonationsByProjectById(projectId: string): Promise<Donation[]> {
    return this.donationRepository
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.project', 'project')
      .where('donation.project = :projectId', { projectId })
      .getMany();
  }

  async saveDonation(donationToSave: CreateDonation[]): Promise<Donation[]> {
    return this.donationRepository.save(
      await this.fromCreateDonationToDomain(donationToSave),
    );
  }

  async fromCreateDonationToDomain(
    toMap: CreateDonation[],
  ): Promise<Donation[]> {
    return Promise.all(
      toMap.map(async (donation) => {
        return await this.mapCreateToDomain(donation);
      }),
    );
  }

  async mapCreateToDomain(create: CreateDonation): Promise<Donation> {
    const domainDonation = new Donation();

    domainDonation.amount = create.amount;
    domainDonation.project = await this.projectService.findById(
      create.project_id,
    );
    domainDonation.user = await this.userService.findById(create.user_id);
    return await domainDonation;
  }
}
