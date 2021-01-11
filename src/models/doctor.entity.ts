import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { DoctorHasSpecialties } from './doctor_has_specialtes.entity';
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

  @OneToMany(
    () => DoctorHasSpecialties,
    (doctorHasSpecialties) => doctorHasSpecialties.doctor,
  )
  @JoinTable()
  doctorHasSpecialties: DoctorHasSpecialties;
}
