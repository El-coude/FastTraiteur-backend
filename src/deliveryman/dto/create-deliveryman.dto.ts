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
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
