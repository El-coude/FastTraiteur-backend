import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAdminDto {
 
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
 
}