import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  images: Array<string>;
}
