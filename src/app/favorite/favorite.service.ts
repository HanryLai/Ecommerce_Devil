import { Inject, Injectable } from '@nestjs/common';
import { FavoriteEntity } from 'src/entities/ecommerce';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRepository } from 'src/repositories/ecommerce/favorite.repository';
import { EntityManager } from 'typeorm';
import { BaseService } from 'src/common/base';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class FavoriteService extends BaseService {
   constructor(
      @InjectRepository(FavoriteEntity) private productRepository: FavoriteRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      try {
         return await this.productRepository.find();
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByAccount(idAccount: CurrentUserDto) {
      try {
         return await this.productRepository.find({
            where: {
               user_id: idAccount.id,
            },
         });
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async addFavorite(user: CurrentUserDto, productId: string) {
      try {
         const favorite = this.productRepository.save({
            user_id: user.id,
            product_id: productId,
         });
         return favorite;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async removeFavorite(user: CurrentUserDto, productId: string) {
      try {
         await this.productRepository.delete({
            user_id: user.id,
            product_id: productId,
         });
         return 'Remove favorite successfully';
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
