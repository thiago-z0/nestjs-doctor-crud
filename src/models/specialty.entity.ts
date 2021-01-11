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
  JoinTableOptions,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DoctorHasSpecialties } from './doctor_has_specialtes.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
    (doctorHasSpecialties) => doctorHasSpecialties.specialty,
  )
  @JoinTable()
  doctorHasSpecialties: DoctorHasSpecialties;
}
