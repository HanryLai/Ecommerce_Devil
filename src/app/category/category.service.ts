import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/common/base';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, ProductEntity } from 'src/entities/ecommerce';
import { CategoryRepository, ProductRepository } from 'src/repositories/ecommerce';

@Injectable()
export class CategoryService extends BaseService {
   constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: CategoryRepository,
      @InjectRepository(ProductEntity)
      private readonly productRepository: ProductRepository,
   ) {
      super();
   }

   async create(createCategoryDto: CreateCategoryDto) {
      try {
         return await this.categoryRepository.save(createCategoryDto);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findAll() {
      try {
         return await this.categoryRepository.find();
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findCategoriesOfProduct(productId: string) {
      const product = await this.productRepository.findOne({
         where: { id: productId },
         relations: ['categories'],
      });
      return product != null ? product.categories : 'Product not found';
   }

   findOne(id: number) {
      return `This action returns a #${id} category`;
   }

   async update(id: number, updateCategoryDto: UpdateCategoryDto) {
      return await this.categoryRepository.update(id, updateCategoryDto);
   }

   async removeCategory(categoryId: string) {
      try {
         await this.categoryRepository.delete(categoryId);
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
