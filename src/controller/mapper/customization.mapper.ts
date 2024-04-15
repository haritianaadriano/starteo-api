import { User } from '../../model/user.entity';
import { Customization } from '../../model/customization.entity';
import { CustomizationApi, CustomizationByIdApi } from '../api/customization.rest';
import { UserApi } from '../api/user.rest';

export class CustomizationMapper {
  constructor() {}

  async byOneToRest(promiseCustomization: Customization): Promise<CustomizationByIdApi> {
    const customizationApi = new CustomizationByIdApi();
    const customization = await promiseCustomization;
    customizationApi.id = customization.id;
    customizationApi.carrer_path = customization.careerPath;
    customizationApi.description = customization.description;
    customizationApi.customization_option = customization.customizationOption;
    return customizationApi;
  }

  async toRest(promiseCustomization: Customization): Promise<CustomizationApi> {
    const customizationApi = new CustomizationApi();
    const customization = await promiseCustomization;

    customizationApi.id = customization.id;
    customizationApi.carrer_path = customization.careerPath;
    customizationApi.description = customization.description;
    customizationApi.customization_option = customization.customizationOption;
    customizationApi.user = await this.toRestUser(customization.user);
    return customizationApi;
  }

  async toRestUser(promiseUser: User): Promise<UserApi> {
    const userApi = new UserApi();
    const user = await promiseUser;
    userApi.id = user.id;
    userApi.username = user.username;
    userApi.setEmail(user.email);
    userApi.setFirstname(user.firstname);
    userApi.setLastname(user.lastname);
    return userApi;
  }
}
