import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  images: Array<string>;

  @IsOptional()
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
