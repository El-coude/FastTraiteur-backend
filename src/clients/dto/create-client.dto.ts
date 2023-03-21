import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
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

  @IsString()
  @IsOptional()
  city: string;
}
