import { FakerService } from '@/utils/faker/faker.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { OptionEntity, ProductEntity } from 'src/entities/ecommerce';
import { OptionRepository, ProductRepository } from 'src/repositories/ecommerce';

export class OptionSeeder extends BaseService {
   constructor(
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
      private readonly fakerService: FakerService,
   ) {
      super();
   }

   async run() {
      try {
         const foundOption = await this.optionRepository.find({
            take: 1,
         });

         if (foundOption && foundOption.length >= 0) {
            const products = await this.productRepository.find();

            for (const product of products) {
               const existingOptions = await this.optionRepository.find({
                  where: { product: product },
               });

               const existingOptionNames = existingOptions.map((option) => option.name);
               const options = await this.fakerService.generateOption(10);

               let i = 1;
               for (const option of options) {
                  if (!existingOptionNames.includes(option.name)) {
                     await this.optionRepository.save({
                        ...option,
                        orderIndex: i++,
                        product: product,
                     });
                     existingOptionNames.push(option.name); // Add the new option name to the list
                  }
               }
            }
         }
         console.log('Option seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
