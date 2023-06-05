import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateDeliveryManDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  name: string;

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
