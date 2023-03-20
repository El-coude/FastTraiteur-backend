import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
 
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}