import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateDeliveryManDto {
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  requestSent: boolean;
  requestMessage: string;
}
