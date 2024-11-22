import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FeedbackRepository, ProductRepository } from 'src/repositories/ecommerce';
import { BaseService } from 'src/common/base';
import { EntityManager, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';

@Injectable()
export class ProductService extends BaseService {
   constructor(
      @InjectRepository(ProductEntity)
      private productRepository: ProductRepository,
      @InjectRepository(FeedbackEntity)
      private feedbackRepository: FeedbackRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async searchProduct(keyword: string) {
      if (keyword.trim() === '') {
         return [];
      }

      try {
         return await this.productRepository.find({
            where: { name: Like(`%${keyword}%`) },
         });
      } catch (error) {
         throw error;
      }
   }

   async findAll() {
      try {
         const products = await this.productRepository.find({});

         if (!products) {
            return [];
         }

         const feedback = await this.feedbackRepository.find({
            relations: ['product'],
         });

         return products.map((product) => {
            const feedbacks = feedback.filter((fb) => fb.product.id === product.id);
            const avgRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length;
            // avgRating round 1 decimal
            const roundRating = Math.round(avgRating * 10) / 10;

            return {
               ...product,
               rating: roundRating,
            };
         });
      } catch (error) {
         throw error;
      }
   }

   async findOne(productId: string) {
      try {
         return await this.productRepository.findOne({
            where: { id: productId },
            relations: [
               'categories',
               'options',
               'options.listOptions',
               'feedbacks.account.detailInformation',
            ],
         });
      } catch (error) {
         throw error;
      }
   }

   async relationProduct () {
      try {
         const product = await this.productRepository.find({
            relations: ['categories', 'options', 'options.listOptions', 'feedbacks'],
         });

         // random 20 product
         const randomProduct = product.sort(() => Math.random() - Math.random()).slice(0, 20);
         return randomProduct;
      } catch (error) {
         throw error;
      }
   }

   async loadProduct(page: number) {
      try {
         const limit = 20;
         const offset = (page - 1) * limit;
         const [listProduct, totalProduct] = await this.productRepository.findAndCount({
            take: limit,
            skip: offset,
         });
         const totalPage = Math.ceil(totalProduct / limit);
         const totalFavoriteOfPage = listProduct.length;
         return {
            metadata: {
               favorites: listProduct,
               numberPage: parseInt(page.toString()),
               limit: limit,
               totalPage: totalPage,
               totalFavoriteOfPage: totalFavoriteOfPage,
            },
         };
      } catch (error) {
         throw error;
      }
   }

   async update(productId: string, updateProductDto: UpdateProductDto) {
      try {
         const product = await this.productRepository.findOne({
            where: { id: productId },
         });
         if (!product) {
            return null;
         }
         return await this.productRepository.save({
            ...product,
            ...updateProductDto,
         });
      } catch (error) {
         throw error;
      }
   }

   async remove(productId: string) {
      try {
         const product = await this.productRepository.findOne({
            where: { id: productId },
         });
         if (!product) {
            return null;
         }
         return await this.productRepository.remove(product);
      } catch (error) {
         throw error;
      }
   }
}
