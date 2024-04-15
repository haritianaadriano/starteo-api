import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  creationDate: Date;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  password: string;

  constructor() {}

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
