import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './models/doctor.entity';
import { Specialty } from './models/specialty.entity';
import { DoctorHasSpecialties } from './models/doctor_has_specialtes.entity';

import { DoctorController } from './doctor/doctor.controller';
import { SpecialtyController } from './specialty/specialty.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Doctor, Specialty, DoctorHasSpecialties],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Doctor, Specialty, DoctorHasSpecialties]),
  ],
  controllers: [AppController, DoctorController, SpecialtyController],
  providers: [AppService],
})
export class AppModule {}
