import { SignupApi } from '../api/signup.rest';
import { UserApi } from '../api/user.rest';
import { User } from './../../model/user.entity';

export class UserMapper {
  constructor() {}

  async toRest(promiseUser: Promise<User>): Promise<UserApi> {
    const userApi = new UserApi();
    const user = await promiseUser;
    userApi.setEmail(user.email);
    userApi.setFirstname(user.firstname);
    userApi.setLastname(user.lastname);
    return userApi;
  }

  userApiToDomain(userApi: UserApi): User {
    const user = new User();
    user.setEmail(userApi.email);
    user.setFirstname(userApi.firstname);
    user.setLastname(userApi.lastname);
    return user;
  }

  signupApiToDomain(signupApi: SignupApi): User {
    const user = new User();
    user.setEmail(signupApi.email);
    user.setFirstname(signupApi.firstname);
    user.setLastname(signupApi.lastname);
    user.setPassword(signupApi.password);
    user.setUsername(signupApi.username);
    return user;
  }
}
