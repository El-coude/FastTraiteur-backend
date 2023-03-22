import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
  @IsOptional()
  @IsString()
  @MinLength(8)
  hash: string;
}
