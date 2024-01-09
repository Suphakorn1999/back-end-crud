/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class ProductBodyDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  price: number;
}
