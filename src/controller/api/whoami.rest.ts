import { ApiProperty } from '@nestjs/swagger';
import { CustomizationOptions } from '../../model/enums/customization.enum';

export class WhoamiApi {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
  customization_option: CustomizationOptions;

  @ApiProperty()
  bearer: string;
}
