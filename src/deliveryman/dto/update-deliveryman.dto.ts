import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { CreateDeliveryManDto } from './create-deliveryman.dto';

export class UpdateDeliveryManDto extends PartialType(CreateDeliveryManDto) {
  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsNumber()
  longtitud: number;

  @IsOptional()
  @IsNumber()
  latitud: number;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
