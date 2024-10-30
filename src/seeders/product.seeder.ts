import { Inject, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "src/app/product/product.service";
import { BaseService } from "src/common/base";
import { ProductEntity } from "src/entities/ecommerce";
import { ProductRepository } from "src/repositories/ecommerce";
import { EntityManager } from "typeorm";

export class ProductSeeder extends BaseService implements OnModuleInit {
   constructor(
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async onModuleInit() {
      try {
         const foundProduct = await this.productRepository.findOne({
            where: {
               name: 'Product 1',
            },
         });
         if (!foundProduct) {
            const product = await this.productRepository.save({
               name: 'Product 1',
               price: 1000,
               description: 'Description for product 1',
            });
            console.log('CREATE NEW PRODUCT: ', product);
         }
      } catch (error) {
         this.ThrowError(error);
      }
   }
}