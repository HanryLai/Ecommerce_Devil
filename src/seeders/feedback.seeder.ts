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
      @InjectRepository(FeedbackEntity) private FeedbackRepository: FeedbackRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async run() {
      try {
         // random account
         const accounts = await this.accountRepository.find();
         const products = await this.productRepository.find();

         for (const account of accounts) {
            const Feedback = await this.FeedbackRepository.findOne({
               where: {
                  account: account,
               },
            });
            if (!Feedback) {
               // const productlenth = products.length;
               for (const product of products) {
                  if (!Feedback) {
                     await this.FeedbackRepository.save({
                        account: account,
                        product: product,
                        //faker data feednack
                        comment: faker.lorem.paragraph(),
                        rating: Math.floor(Math.random() * 5) + 1,
                     });
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
