import { ApiProperty } from '@nestjs/swagger';
import { CustomizationOptions } from '../../model/enums/customization.enum';
import { UserApi } from './user.rest';

export class CustomizationApi {
  @ApiProperty()
  id: number;
  @ApiProperty()
  carrer_path: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
  customization_option: CustomizationOptions;
  @ApiProperty()
  user: UserApi;
}

export class CustomizationByIdApi {
  @ApiProperty()
  id: number;
  @ApiProperty()
  carrer_path: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
  customization_option: CustomizationOptions;
}

export class CrupdateCustomizationApi {
  @ApiProperty()
  id: number;
  @ApiProperty()
  carrer_path: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
  customization_option: CustomizationOptions;
  @ApiProperty()
  user_id: string;
}
