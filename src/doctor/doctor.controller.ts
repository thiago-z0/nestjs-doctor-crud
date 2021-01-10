import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { Doctor } from '../models/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('doctors')
export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  @Post()
  async insert(@Body() body: Doctor): Promise<Doctor> {
    const doctor = this.doctorRepo.create(body);
    return this.doctorRepo.save(doctor);
  }

  @Get()
  async index(): Promise<Doctor[]> {
    return this.doctorRepo.find();
  }

  @Delete(':id')
  @HttpCode(204)
  async inativate(@Param('id') id: string): Promise<void> {
    await this.doctorRepo.findOneOrFail(+id);
    await this.doctorRepo.softDelete(+id);
  }
}
