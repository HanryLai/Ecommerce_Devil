import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { CategoryEntity, ProductEntity } from 'src/entities/ecommerce';
import { CategoryRepository, ProductRepository } from 'src/repositories/ecommerce';

export class CategorySeeder extends BaseService {
   constructor(
      @InjectRepository(CategoryEntity) private categoryRepository: CategoryRepository,
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
   ) {
      super();
   }

   async run() {
      try {
         const foundCategory = await this.categoryRepository.find();

         if (foundCategory.length === 0) {
            for (let i = 0; i < 10; i++) {
               const category = this.categoryRepository.create({
                  title: faker.commerce.productName(),
                  description: faker.commerce.productDescription(),
                  image: faker.image.urlLoremFlickr(),
               });
               await this.categoryRepository.save(category);
            }

            const products = await this.productRepository.find();
            const categories = await this.categoryRepository.find();

            for (let i = 0; i < products.length; i++) {
               const product = products[i];
               const category = categories[Math.floor(Math.random() * categories.length)];
               product.categories = [category];
               await this.productRepository.save(product);
            }
         }
         console.log('Category seeder done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
