import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { CategoryEntity } from 'src/entities/ecommerce';
import { CategoryRepository } from 'src/repositories/ecommerce';

export class CategorySeeder extends BaseService {
   constructor(@InjectRepository(CategoryEntity) private categoryRepository: CategoryRepository) {
      super();
   }

   async run() {
      try {
         const foundCategory = await this.categoryRepository.findOne({
            where: {
               title: 'Category 1',
            },
         });
         if (!foundCategory) {
            for (let i = 0; i < 10; i++) {
               const category = this.categoryRepository.create({
                  title: `Category ${i}`,
                  description: `Description ${i}`,
                  image: 'no-image.jpg',
               });
               await this.categoryRepository.save(category);
            }
         }
         console.log('Category seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
