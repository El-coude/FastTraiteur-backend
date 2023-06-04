import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
export class CreateOrderDto {
  @IsNumber()
  price: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitud: number;

  @IsNumber()
  clientId: number;

  @IsNumber()
  restaurantId: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  orderItems: CreateOrderItemDto[];
}
