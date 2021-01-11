import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsNumberString,
  IsInt,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @MaxLength(10)
  @MinLength(5)
  @IsNumberString()
  @IsNotEmpty()
  crm: string;

  @ApiProperty()
  @IsArray()
  @IsInt({
    each: true,
  })
  @IsNotEmpty()
  specialties?: number[];
}
