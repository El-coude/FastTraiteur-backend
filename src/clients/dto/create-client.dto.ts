import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  longtitud: number;

  @IsNotEmpty()
  @IsNumber()
  latitud: number;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
