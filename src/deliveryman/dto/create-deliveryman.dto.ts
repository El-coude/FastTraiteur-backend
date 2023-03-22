import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateDeliveryManDto {
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  name: string;
}
