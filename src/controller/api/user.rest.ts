import { ApiProperty } from '@nestjs/swagger';

export class UserApi {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;

  constructor() {}

  setFirstname(firstname: string) {
    this.firstname = firstname;
  }
  setLastname(lastname: string) {
    this.lastname = lastname;
  }
  setEmail(email: string) {
    this.email = email;
  }
}
