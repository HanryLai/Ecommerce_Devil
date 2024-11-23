import { FakerService } from '@/utils/faker/faker.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { ListOptionEntity, OptionEntity } from 'src/entities/ecommerce';
import { ListOptionRepository, OptionRepository } from 'src/repositories/ecommerce';

export class ListOptionSeeder extends BaseService {
   constructor(
      @InjectRepository(ListOptionEntity) private listOptionRepository: ListOptionRepository,
      @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
      private readonly fakerService: FakerService,
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

            for (const option of options) {
               const existingListOptions = await this.listOptionRepository.find({
                  where: { option: option },
               });

               const existingListOptionNames = existingListOptions.map(
                  (listOption) => listOption.name,
               );
               const listOptions = await this.fakerService.generateListOption(option.name, 5);

               let i = 1;
               for (const listOption of listOptions) {
                  if (!existingListOptionNames.includes(listOption.name)) {
                     await this.listOptionRepository.save({
                        ...listOption,
                        orderIndex: i++,
                        adjustPrice: Math.floor(Math.random() * 100),
                        quantity: Math.floor(Math.random() * 10),
                        option: option,
                     });
                     existingListOptionNames.push(listOption.name); // Add the new list option name to the list
                  }
               }
            }
         }
         console.log('List Option seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
