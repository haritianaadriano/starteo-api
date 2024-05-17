import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  NotEquals,
} from 'class-validator';
import { CustomizationOptions } from '../../model/enums/customization.enum';

export class SignupApi {
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @NotEquals(null)
  phone_number: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsString()
  career_path: string;

  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
  @NotEquals(null)
  @IsEnum(CustomizationOptions)
  customization_option: CustomizationOptions;

  constructor() {}

  setDescription(description: string) {
    this.description = description;
  }
  setCareerPath(careerPath: string) {
    this.career_path = careerPath;
  }
  setCustomizationOptio(customization: CustomizationOptions) {
    this.customization_option = customization;
  }
  setBirthdate(date: Date) {
    this.birthdate = date;
  }
  setFirstname(firstname: string) {
    this.firstname = firstname;
  }
  setLastname(lastname: string) {
    this.lastname = lastname;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }
}
