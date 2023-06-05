import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdatePositionDto {
  @IsNumber()
  longtitud: number;

  @IsNumber()
  latitud: number;
}
