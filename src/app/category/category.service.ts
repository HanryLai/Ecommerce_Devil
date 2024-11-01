import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/common/base';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/ecommerce';
import { CategoryRepository } from 'src/repositories/ecommerce';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class CategoryService extends BaseService {
   constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: CategoryRepository,
   ) {
      super();
   }

   addCategory(createCategoryDto: CreateCategoryDto) {
      return 'This action adds a new category';
   }

   async findAll() {
      try {
         return await this.categoryRepository.find();
      } catch (error) {
         this.ThrowError(error);
      }
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
         return 'Category has been deleted';
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
