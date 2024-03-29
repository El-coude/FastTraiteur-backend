import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  mealId: number;
}
