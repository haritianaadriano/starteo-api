import { SignupApi } from '../api/signup.rest';
import { UserApi } from '../api/user.rest';
import { User } from './../../model/user.entity';

export class UserMapper {
  constructor() {}

  async toRest(promiseUser: Promise<User>): Promise<UserApi> {
    let userApi = new UserApi();
    let user = await promiseUser;
    userApi.setEmail(user.email);
    userApi.setFirstname(user.firstname);
    userApi.setLastname(user.lastname);
    return userApi;
  }

  userApiToDomain(userApi: UserApi): User {
    let user = new User();
    user.setEmail(userApi.email);
    user.setFirstname(userApi.firstname);
    user.setLastname(userApi.lastname);
    return user;
  }

  signupApiToDomain(signupApi: SignupApi): User {
    let user = new User();
    user.setEmail(signupApi.email);
    user.setFirstname(signupApi.firstname);
    user.setLastname(signupApi.lastname);
    user.setPassword(signupApi.password);
    return user;
  }
}
