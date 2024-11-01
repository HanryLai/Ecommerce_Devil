import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { ListOptionEntity, OptionEntity } from 'src/entities/ecommerce';
import { ListOptionRepository, OptionRepository } from 'src/repositories/ecommerce';

export class ListOptionSeeder extends BaseService {
   constructor(
      @InjectRepository(ListOptionEntity) private listOptionRepository: ListOptionRepository,
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
   ) {
      super();
   }

   async run() {
      try {
         const foundListOption = await this.listOptionRepository.findOne({
            where: {
               name: 'List Option 1',
            },
         });

         if (!foundListOption) {
            const options = await this.optionRepository.find();
            for (let i = 0; i < 10; i++) {
               const randomOption = options[Math.floor(Math.random() * options.length)];
               const listOption = this.listOptionRepository.create({
                  name: `List Option ${i}`,
                  description: `Description ${i}`,
                  orderIndex: i + 1,
                  adjustPrice: 1000,
                  quantity: Math.floor(Math.random() * 10),
                  option: randomOption,
               });
               await this.listOptionRepository.save(listOption);
            }
         }
         console.log('List Option seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
