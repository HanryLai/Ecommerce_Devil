import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/app/product/product.service';
import { BaseService } from 'src/common/base';
import { ProductEntity } from 'src/entities/ecommerce';
import { ProductRepository } from 'src/repositories/ecommerce';
import { EntityManager } from 'typeorm';

export class ProductSeeder extends BaseService {
   constructor(@InjectRepository(ProductEntity) private productRepository: ProductRepository) {
      super();
   }

   async run() {
      try {
         const foundProduct = await this.productRepository.findOne({
            where: {
               name: 'Product 1',
            },
         });
         if (!foundProduct) {
            for (let i = 0; i < 10; i++) {
               const product = this.productRepository.create({
                  name: `Product ${i}`,
                  description: `Description ${i}`,
                  price: 1000 * i,
               });
               await this.productRepository.save(product);
            }
         }

         console.log('Product seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
