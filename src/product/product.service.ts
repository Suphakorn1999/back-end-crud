/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBodyDto } from './dto/product-body.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (e) {
      console.log(e);
    }
  }

  async create(product: ProductBodyDto): Promise<Product> {
    try {
      return await this.productRepository.save(product);
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, product: ProductBodyDto): Promise<Product> {
    try {
      const productToUpdate = await this.productRepository.save({
        id,
        ...product,
      });
      return productToUpdate;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: number) {
    try {
      const productfind = await this.productRepository.findOne({
        where: { id },
      });

      if (!productfind) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      await this.productRepository.softDelete(id);
      return {
        statusCode: 200,
        message: 'Product deleted successfully',
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
