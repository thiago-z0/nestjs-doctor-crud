import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Doctor } from '../models/doctor.entity';
import { Specialty } from '../models/specialty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(Specialty)
    private specialtyRepo: Repository<Specialty>,
  ) {}

  @Post()
  async insert(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: DoctorDto,
  ): Promise<Doctor> {
    const specialties = await Promise.all(
      body.specialties.map((id) => this.specialtyRepo.findOneOrFail(id)),
    );

    const doctor = this.doctorRepo.create({
      ...body,
      specialties,
    });

    return this.doctorRepo.save(doctor);
  }

  @Get()
  async index(): Promise<Doctor[]> {
    return this.doctorRepo.find({
      relations: ['specialties'],
    });
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Doctor> {
    console.log(id);
    return this.doctorRepo.findOneOrFail(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  async inativate(@Param('id') id: string): Promise<void> {
    await this.doctorRepo.findOneOrFail(+id);
    await this.doctorRepo.softDelete(+id);
  }
}
