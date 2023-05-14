import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  longtitud: number;

  @IsNotEmpty()
  @IsNumber()
  latitud: number;
}
