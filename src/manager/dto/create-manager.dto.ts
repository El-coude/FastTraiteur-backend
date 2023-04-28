import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class CreateManagerDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsString()
  @IsOptional()
  name: string;
}
