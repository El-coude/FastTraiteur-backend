import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  city: string;
}
