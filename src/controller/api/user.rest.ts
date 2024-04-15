import { ApiProperty } from '@nestjs/swagger';

export class UserApi {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;

  constructor() {}

  setUsername(username: string) {
    this.username = username;
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
}
