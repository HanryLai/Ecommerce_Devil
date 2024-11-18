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
         // getAll account
         const accounts = await this.accountRepository.find();
         // getAll product
         const products = await this.productRepository.find();

         // account 1 favorite product 1,2,3
         const account1 = accounts[0];
         const product1 = products[0];
         const product2 = products[1];
         const product3 = products[2];
         const favorite1 = this.favoriteRepository.save({
            user_id: account1.id,
            product_id: product1.id,
         });
         const favorite2 = this.favoriteRepository.save({
            user_id: account1.id,
            product_id: product2.id,
         });
         const favorite3 = this.favoriteRepository.save({
            user_id: account1.id,
            product_id: product3.id,
         });
         console.log("FavoriteSeeder: Done");
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
