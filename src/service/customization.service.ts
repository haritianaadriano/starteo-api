import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customization } from '../model/customization.entity';
import { Repository } from 'typeorm';
import { CrupdateCustomizationApi } from '../controller/api/customization.rest';
import { UserService } from './user.service';

@Injectable()
export class CustomizationService {
  constructor(
    @InjectRepository(Customization)
    private readonly customizationRepository: Repository<Customization>,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async mapAndSave(
    customizations: CrupdateCustomizationApi[],
  ): Promise<Customization[]> {
    const mappedCustomizations = await Promise.all(
      customizations.map(async (customization) => {
        return await this.mapToDomain(customization);
      }),
    );
    return this.save(mappedCustomizations);
  }

  async save(customizations: Customization[]): Promise<Customization[]> {
    return this.customizationRepository.save(customizations);
  }

  async findById(id: number): Promise<Customization | undefined> {
    return this.customizationRepository.findOneById(id);
  }

  async mapToDomain(
    crupdateCustomization: CrupdateCustomizationApi,
  ): Promise<Customization> {
    const customization = new Customization();
    const user = await this.userService.findById(crupdateCustomization.user_id);

    customization.id = crupdateCustomization.id;
    customization.careerPath = crupdateCustomization.carrer_path;
    customization.description = crupdateCustomization.description;
    customization.customizationOption =
      crupdateCustomization.customization_option;
    customization.user = user;

    return customization;
  }
}
