import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/common/base';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';
import {
   CategoryRepository,
   FeedbackRepository,
   ProductRepository,
} from 'src/repositories/ecommerce';

@Injectable()
export class CategoryService extends BaseService {
   constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: CategoryRepository,
      @InjectRepository(ProductEntity)
      private readonly productRepository: ProductRepository,
      @InjectRepository(FeedbackEntity)
      private readonly feedbackRepository: FeedbackRepository,
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

   async findProductsByCategory(categoryId: string) {
      try {
         const products = await this.productRepository.find({
            where: { categories: { id: categoryId } },
         });

         if (!products) {
            return [];
         }
         const feedback = await this.feedbackRepository.find({
            where: { isFeedback: true },
            relations: ['product'],
         });

         return products.map((product) => {
            const feedbacks = feedback.filter((fb) => fb.product.id === product.id);
            if (feedbacks.length === 0) {
               return {
                  ...product,
                  rating: 0,
               };
            }
            const avgRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length;
            // avgRating round 1 decimal
            const roundRating = Math.round(avgRating * 10) / 10;

            return {
               ...product,
               rating: roundRating,
            };
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async update(id: string, updateCategoryDto: UpdateCategoryDto) {
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
