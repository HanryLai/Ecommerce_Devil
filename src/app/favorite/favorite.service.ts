import { Inject, Injectable } from '@nestjs/common';
import { FavoriteEntity, ProductEntity } from 'src/entities/ecommerce';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRepository } from 'src/repositories/ecommerce/favorite.repository';
import { EntityManager } from 'typeorm';
import { BaseService } from 'src/common/base';
import { CurrentUserDto } from 'src/common/interceptor';
import { ProductRepository } from '@/repositories/ecommerce';

@Injectable()
export class FavoriteService extends BaseService {
   constructor(
      @InjectRepository(FavoriteEntity) private favoriteRepository: FavoriteRepository,
      @InjectRepository(ProductEntity) private productRepository: ProductRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      try {
         return await this.favoriteRepository.find();
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async findByAccount(idAccount: CurrentUserDto) {
      try {
         const favorite = await this.favoriteRepository.find({
            where: {
               userId: idAccount.id,
            },
            relations: ['product'],
         });
         if (!favorite) {
            this.NotFoundException('Favorite not found');
         }
         return favorite;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async addFavorite(user: CurrentUserDto, productId: string) {
      try {
         const product = await this.productRepository.findOne({
            where: {
               id: productId,
            },
         });
         if (!product) {
            this.NotFoundException('Product not found');
         }
         const favorite = await this.favoriteRepository.findOne({
            where: {
               userId: user.id,
               productId: productId,
            },
         });
         if (favorite) {
            this.BadRequestException('Product already in favorite');
         }
         return await this.favoriteRepository.save({
            userId: user.id,
            productId: productId,
         });



      } catch (error) {
         this.ThrowError(error);
      }
   }

   async removeFavorite(user: CurrentUserDto, productId: string) {
      try {
         await this.favoriteRepository.delete({
            userId: user.id,
            productId: productId,
         });
         return 'Remove favorite successfully';
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
