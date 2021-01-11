import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { Specialty } from '../models/specialty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtyDto } from './specialty.dto';

@Controller('specialties')
export class SpecialtyController {
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepo: Repository<Specialty>,
  ) {}

  @Post()
  async insert(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: SpecialtyDto,
  ): Promise<Specialty> {
    const doctor = this.specialtyRepo.create(body);
    return this.specialtyRepo.save(doctor);
  }

  @Get()
  async index(): Promise<Specialty[]> {
    return this.specialtyRepo.find();
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Specialty> {
    console.log(id);
    return this.specialtyRepo.findOneOrFail(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  async inativate(@Param('id') id: string): Promise<void> {
    await this.specialtyRepo.findOneOrFail(+id);
    await this.specialtyRepo.softDelete(+id);
  }
}
