import { faker } from '@faker-js/faker';
import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { AccountEntity } from 'src/entities/auth';
import { FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';
import { AccountRepository } from 'src/repositories/auth';
import { ProductRepository } from 'src/repositories/ecommerce';
import { FeedbackRepository } from 'src/repositories/ecommerce/Feedback.repository';
import { EntityManager } from 'typeorm';

export class FeedbackSeeder extends BaseService {
   constructor(
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      @InjectRepository(FeedbackEntity) private feedbackRepository: FeedbackRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async run() {
      try {
         // random account

         const foundFeedback = await this.feedbackRepository.find();
         const accounts = await this.accountRepository.find();
         const products = await this.productRepository.find();

         if (foundFeedback && foundFeedback.length === 0) {
            for (const account of accounts) {
               const Feedback = await this.feedbackRepository.findOne({
                  where: {
                     account: account,
                  },
               });
               if (!Feedback) {
                  // const productlenth = products.length;
                  for (const product of products) {
                     // random 5-10 feedback
                     const count = Math.floor(Math.random() * 5) + 5;
                     const booleanRandom = Math.random() >= 0.5;
                     if (!Feedback) {
                        for (let i = 0; i < count; i++) {
                           await this.feedbackRepository.save({
                              account: account,
                              product: product,
                              rating: booleanRandom ? Math.floor(Math.random() * 5) + 1 : 0,
                              comment: faker.lorem.sentence(),
                              isFeedback: booleanRandom,
                           });
                        }
                     }
                  }
               }
            }
         }

         console.log('FeedbackSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
