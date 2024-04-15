import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CustomizationService } from '../service/customization.service';
import {
  CrupdateCustomizationApi,
  CustomizationApi,
  CustomizationByIdApi,
} from './api/customization.rest';
import { CustomizationMapper } from './mapper/customization.mapper';
import { AuthGuard } from '../auth/guards/auth.guards';

@Controller('/customizations')
export class CustomizationController {
  constructor(
    private readonly customizationService: CustomizationService,
    private readonly customizationMapper: CustomizationMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Put()
  @ApiCreatedResponse({
    description: 'Customization crupdated',
    type: CustomizationApi,
    isArray: true,
  })
  @ApiBody({ type: [CrupdateCustomizationApi] })
  @ApiTags('customizations')
  async crupdateCustomization(
    @Body() toCrupdate: CrupdateCustomizationApi[],
  ): Promise<CustomizationApi[]> {
    const domainCustomizations =
      await this.customizationService.mapAndSave(toCrupdate);

    console.log(domainCustomizations);

    const restCustomizations = await Promise.all(
      domainCustomizations.map((customization) =>
        this.customizationMapper.toRest(customization),
      ),
    );
    return restCustomizations;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'Customization found',
    type: CustomizationByIdApi,
  })
  @ApiTags('customizations')
  async findCustomizationById(
    @Param() id: number,
  ): Promise<CustomizationByIdApi> {
    const customization = await this.customizationService.findById(id);
    const mappedCustomization =
      this.customizationMapper.byOneToRest(customization);
    return mappedCustomization;
  }
}
