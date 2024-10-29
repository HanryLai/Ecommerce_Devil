import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repositories/ecommerce';
import { BaseService } from 'src/common/base';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductService extends BaseService {
   constructor(
      private readonly productRepository: ProductRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      return await this.productRepository.find();
   }
}
