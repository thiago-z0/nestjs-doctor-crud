import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Specialty } from './specialty.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  last_name: string;

  @Column()
  crm: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToMany(() => Specialty)
  @JoinTable({
    joinColumns: [
      {
        name: 'doctor_id',
        referencedColumnName: 'id',
      },
    ],
    name: 'doctor_has_specialties',
  })
  specialties: Specialty[];
}
