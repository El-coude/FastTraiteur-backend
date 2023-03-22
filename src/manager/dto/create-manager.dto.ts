import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManagerDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @IsString()
  @IsOptional()
  name: string;
}
