import { SignupApi } from '../api/signup.rest';
import { UserApi } from '../api/user.rest';
import { WhoamiApi } from '../api/whoami.rest';
import { User } from './../../model/user.entity';

export class UserMapper {
  constructor() {}

  async toWhoamiApi(
    user: Promise<{ user: User; bearer: string }>,
  ): Promise<WhoamiApi> {
    const whoamiApi = new WhoamiApi();

    whoamiApi.id = (await user).user.id;
    whoamiApi.customization_option = await (
      await user
    ).user.customizationOption;
    whoamiApi.bearer = await (await user).bearer;
    return whoamiApi;
  }

  async fromDomainToRest(user: User): Promise<UserApi> {
    const userApi = new UserApi();

    userApi.id = user.id;
    userApi.username = user.username;
    userApi.setEmail(user.email);
    userApi.setFirstname(user.firstname);
    userApi.setLastname(user.lastname);
    userApi.setCareerPath(user.careerPath);
    userApi.setCustomizationOptio(user.customizationOption);
    userApi.setDescription(user.description);
    userApi.setBirthdate(user.birthdate);
    userApi.setCreationDate(user.creationDate);
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
    userApi.setCareerPath(user.careerPath);
    userApi.setCustomizationOptio(user.customizationOption);
    userApi.setDescription(user.description);
    userApi.setBirthdate(user.birthdate);
    userApi.setCreationDate(user.creationDate);
    return userApi;
  }

  userApiToDomain(userApi: UserApi): User {
    const user = new User();

    user.setEmail(userApi.email);
    user.setFirstname(userApi.firstname);
    user.setLastname(userApi.lastname);
    user.setUsername(userApi.username);
    user.setCareerPath(userApi.career_path);
    user.setCustomizationOptio(userApi.customization_option);
    user.setDescription(userApi.description);
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
    user.setCareerPath(signupApi.career_path);
    user.setDescription(signupApi.description);
    user.setCustomizationOptio(signupApi.customization_option);
    user.phoneNumber = signupApi.phone_number;
    return user;
  }
}
