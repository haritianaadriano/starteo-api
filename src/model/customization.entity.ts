import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CustomizationOptions } from './enums/customization.enum';

@Entity()
export class Customization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  careerPath: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  customizationOption: CustomizationOptions;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {}
}
