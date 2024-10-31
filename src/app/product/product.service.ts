import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repositories/ecommerce';
import { BaseService } from 'src/common/base';
import { EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/ecommerce';

@Injectable()
export class ProductService extends BaseService {
   constructor(
      @InjectRepository(ProductEntity)
      private productRepository: ProductRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      return await this.productRepository.find();
   }

   async findOne(id: string) {
      return await this.productRepository.findOne({
         where: { id },
         select: ['id', 'name', 'description', 'price'],
      });
   }

   async update(id: string, updateProductDto: UpdateProductDto) {
      return await this.productRepository.update(id, updateProductDto);
   }

   async remove(id: string) {
      return await this.productRepository.delete(id);
   }
}
