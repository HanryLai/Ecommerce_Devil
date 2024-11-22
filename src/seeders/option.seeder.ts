import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { OptionEntity, ProductEntity } from 'src/entities/ecommerce';
import { OptionRepository, ProductRepository } from 'src/repositories/ecommerce';

export class OptionSeeder extends BaseService {
   constructor(
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
   ) {
      super();
   }

   async run() {
      try {
         const foundOption = await this.optionRepository.findOne({
            where: { 
               name: 'Option 1',
            },
         });

         if (!foundOption) {
            const products = await this.productRepository.find();
            for (let i = 0; i < 10; i++) {
               const randomProduct = products[Math.floor(Math.random() * products.length)];
               const option = this.optionRepository.create({
                  name: `Option ${i + 1}`,
                  description: `Description ${i + 1}`,
                  orderIndex: i + 1,
                  product: randomProduct,
               });
               await this.optionRepository.save(option);
            }
         }
         console.log('Option seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
