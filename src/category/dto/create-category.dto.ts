/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean
}
