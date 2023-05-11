import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMealImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  mealId: number;
}
