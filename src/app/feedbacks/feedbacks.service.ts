import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';
import { FeedbackRepository } from 'src/repositories/ecommerce/feedback.repository';
import { EntityManager } from 'typeorm';
import { BaseService } from 'src/common/base';
import { log } from 'console';
import { CurrentUserDto } from 'src/common/interceptor';
import { ProductRepository } from 'src/repositories/ecommerce';

@Injectable()
export class FeedbacksService extends BaseService {
   constructor(
      @InjectRepository(FeedbackEntity)
      private feedbackRepository: FeedbackRepository,
      @InjectRepository(ProductEntity)
      private productRepository: ProductRepository,
      // private entityManager: EntityManager,
   ) {
      super();
   }

   async addFavorite(user: CurrentUserDto, createFeedbackDto: CreateFeedbackDto) {
      try {
         console.log(user);
         const product = await this.productRepository.findOne({
            where: { id: createFeedbackDto.product_id },
         });
         const favorite = this.feedbackRepository.save({
            account: user,
            product: product,
            ...createFeedbackDto,
         });

         return favorite;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByAccount(idAccount: CurrentUserDto) {
      try {
         return await this.feedbackRepository.find({
            where: {
               account: { id: idAccount.id },
               isFeedback: false
            },
            relations: ['product'],
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByProduct(idProduct: string) {
      try {
         const feedbacks = await this.feedbackRepository.find({
            where: {
               product: {
                  id: idProduct, // Đảm bảo `product` được liên kết qua ID
               },
               isFeedback: true,
            },
            relations: ['account.detailInformation'],
         });

         if (!feedbacks.length) {
            []
         }

         return feedbacks;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) {
      try {
         const feedback = await this.feedbackRepository.findOne({ where: { id } });

         if (!feedback) {
            throw new Error(`Feedback with ID: ${id} not found`);
         }

         const updatedFeedback = await this.feedbackRepository.save({
            ...feedback,
            ...updateFeedbackDto,
         });

         return updatedFeedback;
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
