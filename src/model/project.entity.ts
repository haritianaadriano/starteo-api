import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Donation } from './donation.entity';
import { Category } from './category.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @Column({ nullable: true, default: 0 })
  donationCollected: number;

  @OneToMany(() => Donation, (donation) => donation.project, {
    cascade: false,
    eager: true,
  })
  donations: Donation[];

  @OneToMany(() => Category, (category) => category.project, {
    cascade: false,
    eager: true,
  })
  categories: Category[];

  constructor() {}
}
