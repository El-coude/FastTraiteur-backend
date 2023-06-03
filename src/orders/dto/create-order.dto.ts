import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  price: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitud: number;

  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsString()
  address: string;
}
