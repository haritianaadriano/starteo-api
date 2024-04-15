import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CustomizationOptions } from '../../model/enums/customization.enum';

export class SignupApi {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  birthdate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  career_path: string;
  @ApiProperty({ enum: ['PROFESSIONAL', 'STUDENT'] })
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
