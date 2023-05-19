import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';
import { IsOptional } from 'class-validator';
export class UpdateMealDto extends PartialType(CreateMealDto) {
  @IsOptional()
  newImages: string[];

  @IsOptional()
  deletedImages: string[];
}
