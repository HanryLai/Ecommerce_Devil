import { faker } from '@faker-js/faker';
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
         const foundCategory = await this.categoryRepository.find()

         if (foundCategory.length === 0) {
            for (let i = 0; i < 10; i++) {
               const category = this.categoryRepository.create({
                  title: faker.commerce.productName(),
                  description: faker.commerce.productDescription(),
                  image: faker.image.urlLoremFlickr(),
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
