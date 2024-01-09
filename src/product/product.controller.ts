/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductBodyDto } from './dto/product-body.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAll')
  async getAll() {
    return await this.productService.getAll();
  }

  @Post('create')
  async create(@Body() product: ProductBodyDto) {
    return await this.productService.create(product);
  }

  @Put('update/:id')
  async update(@Body() product: ProductBodyDto, @Param('id') id: number) {
    return await this.productService.update(id, product);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
