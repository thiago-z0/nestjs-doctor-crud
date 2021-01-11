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
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Specialty } from './specialty.entity';
import { Doctor } from './doctor.entity';
import { Exclude } from 'class-transformer';

@Entity('doctor_has_specialties')
export class DoctorHasSpecialties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_id: number;

  @Column()
  specialty_id: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorHasSpecialties, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  doctor: Doctor;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctorHasSpecialties, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'specialty_id', referencedColumnName: 'id' }])
  specialty: Specialty;
}
