import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { AccountEntity } from 'src/entities/auth';
import { FavoriteEntity, ProductEntity } from 'src/entities/ecommerce';
import { AccountRepository } from 'src/repositories/auth';
import { ProductRepository } from 'src/repositories/ecommerce';
import { FavoriteRepository } from 'src/repositories/ecommerce/favorite.repository';
import { EntityManager } from 'typeorm';

export class FavoriteSeeder extends BaseService {
   constructor(
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      @InjectRepository(FavoriteEntity) private favoriteRepository: FavoriteRepository,
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
            const favorite = await this.favoriteRepository.findOne({
               where: {
                  userId: account.id,
               },
            });
            if (!favorite) {
               // random 7 - 9 product from products
               for (const product of products.slice(0, Math.floor(Math.random() * 3) + 7)) {
                  if (!favorite) {
                     await this.favoriteRepository.save({
                        userId: account.id,
                        productId: product.id,
                     });
                  }
               }
            }
         }

         console.log('FavoriteSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
