
import { InjectRepository } from '@nestjs/typeorm';
import { FakerService } from 'src/utils/faker/faker.service';

import { BaseService } from 'src/common/base';
import { ProductEntity } from 'src/entities/ecommerce';
import { ProductRepository } from 'src/repositories/ecommerce';

export class ProductSeeder extends BaseService {
   constructor(@InjectRepository(ProductEntity) private productRepository: ProductRepository,
   private readonly fakerService: FakerService,
) {
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
            const products = await this.fakerService.generateProduct(10);
           for (const product of products) {
               await this.productRepository.save(product);
           }
         }

         console.log('ProductSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
