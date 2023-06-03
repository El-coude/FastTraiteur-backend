import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateOrderStateDto {
  @IsNotEmpty()
  @IsString()
  state: string;
}
