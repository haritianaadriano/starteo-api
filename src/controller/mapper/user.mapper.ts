import { SignupApi } from '../api/signup.rest';
import { UserApi } from '../api/user.rest';
import { User } from './../../model/user.entity';

export class UserMapper {
  constructor() {}

  async fromDomainToRest(user: User): Promise<UserApi> {
    const userApi = new UserApi();
    userApi.id = user.id;
    userApi.username = user.username;
    userApi.setEmail(user.email);
    userApi.setFirstname(user.firstname);
    userApi.setLastname(user.lastname);
    return userApi; 
  }

  async toRest(promiseUser: Promise<User>): Promise<UserApi> {
    const userApi = new UserApi();
    const user = await promiseUser;
    userApi.id = user.id;
    userApi.username = user.username;
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
    user.setUsername(userApi.username);
    return user;
  }

  signupApiToDomain(signupApi: SignupApi): User {
    const user = new User();
    user.setEmail(signupApi.email);
    user.setFirstname(signupApi.firstname);
    user.setLastname(signupApi.lastname);
    user.setPassword(signupApi.password);
    user.setUsername(signupApi.username);
    user.setBirthdate(signupApi.birthdate);
    return user;
  }
}
