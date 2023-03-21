import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateLiveryManDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  address: string;


}