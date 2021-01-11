import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpecialtyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
