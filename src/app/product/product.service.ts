import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FeedbackRepository, ProductRepository } from 'src/repositories/ecommerce';
import { BaseService } from 'src/common/base';
import { Between, EntityManager, Like } from 'typeorm';
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
         // Lowercase keyword like lowercase name of product
         const products = await this.productRepository.find({
            where: { name: Like(`%${keyword.toLowerCase()}%`) },
            relations: ['feedbacks'],
         });

         if (!products) {
            return [];
         }

         return products.map((product) => {
            const feedbacks = product.feedbacks.filter((fb) => fb.isFeedback === true);
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

   async searchProductByPriceRange(minPrice: number, maxPrice: number) {
      try {
         const result = await this.productRepository.find({
            where: { price: Between(minPrice, maxPrice) },
         });
         if (!result) {
            return [];
         }
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async getAll() {
      try {
         const products = await this.productRepository.find({});

         if (!products) {
            return [];
         }

         const feedback = await this.feedbackRepository.find({
            where: { isFeedback: true },
            relations: ['product'],
         });

         return products.map((product) => {
            const feedbacks = feedback.filter((fb) => fb.product?.id === product.id);
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

   async findOne(productId: string) {
      try {
         const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: [
               'categories',
               'options',
               'options.listOptions',
               'feedbacks.account.detailInformation',
            ],
         });
         if (!result) {
            this.NotFoundException('Product not found');
         }
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async relationProduct() {
      try {
         const productsResult = await this.productRepository.find({ take: 20 });

         if (!productsResult) {
            return [];
         }

         const feedback = await this.feedbackRepository.find({
            where: { isFeedback: true },
            relations: ['product'],
         });

         return productsResult.map((product) => {
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

         const feedback = await this.feedbackRepository.find({
            where: { isFeedback: true },
            relations: ['product'],
         });

         const productWithRating = listProduct.map((product) => {
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

         return {
            data: productWithRating,
            metadata: {
               numberPage: parseInt(page.toString()),
               limit: limit,
               totalPage: totalPage,
               totalFavoriteOfPage: totalFavoriteOfPage,
            },
         };
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async update(productId: string, updateProductDto: UpdateProductDto) {
      try {
         const product = await this.productRepository.findOne({
            where: { id: productId },
         });
         if (!product) {
            this.NotFoundException('Product not found');
         }
         return await this.productRepository.save({
            ...product,
            ...updateProductDto,
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async remove(productId: string) {
      try {
         const product = await this.productRepository.findOne({
            where: { id: productId },
         });
         if (!product) {
            this.NotFoundException('Product not found');
         }
         return await this.productRepository.remove(product);
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async getProductListOption(productId: string) {
      try {
         const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['options', 'options.listOptions'],
         });
         if (!product) {
            this.NotFoundException('Product not found');
         }
         let listOptionOfOption = [];

         for (const option of product.options) {
            // random 1 listOption of listOptions of option
            const listOptions = option.listOptions
               .sort(() => Math.random() - Math.random())
               .slice(0, 1);

            listOptionOfOption.push(
               listOptions.map((listOption) => {
                  return listOption.id;
               }),
            );
         }

         const listOptionStringArray = listOptionOfOption.map((listOption) => {
            return listOption.join(',');
         });

         return {
            productId: product.id,
            listOptions: listOptionStringArray,
         };
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
