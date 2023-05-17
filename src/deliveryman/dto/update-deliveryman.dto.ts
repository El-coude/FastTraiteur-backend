import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateDeliveryManDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  name: string;

  @IsOptional()
  restaurantId: number;
}
