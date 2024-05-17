import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomizationOptions } from './enums/customization.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  username: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column()
  email: string;

  @Column({ default: '' })
  phoneNumer: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  customizationOption: CustomizationOptions;

  @Column()
  careerPath: string;

  @Column()
  password: string;

  @Column({ default: true })
  isSubscribed: boolean;

  constructor() {}

  setId(id: string) {
    this.id = id;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setCareerPath(careerPath: string) {
    this.careerPath = careerPath;
  }
  setCustomizationOptio(customization: CustomizationOptions) {
    this.customizationOption = customization;
  }
  setBirthdate(birthdate: Date) {
    this.birthdate = birthdate;
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
  setPassword(password: string) {
    this.password = password;
  }
  setUsername(username: string) {
    this.username = username;
  }
}
