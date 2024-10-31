import { Inject, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteEntity } from 'src/entities/ecommerce';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRepository } from 'src/repositories/ecommerce/favorite.repository';
import { EntityManager } from 'typeorm';
import { BaseService } from 'src/common/base';

@Injectable()
export class FavoriteService extends BaseService {
   constructor(
      @InjectRepository(FavoriteEntity) private productRepository: FavoriteRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      return await this.productRepository.find();
   }

   async findByAccount(idAccount: string) {
      const favorites = await this.productRepository.find({
         where: { userId: idAccount },
         select: ['product'],
         relations: ['product'],
      });
      const products = favorites.map((favorite) => favorite.product);
      return products;
   }

   async addFavorite(createFavoriteDto: CreateFavoriteDto) {
      try {
         const favorite = this.productRepository.save({
            userId: createFavoriteDto.user_id,
            productId: createFavoriteDto.product_id,
         });
         return favorite;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async removeFavorite(createFavoriteDto: CreateFavoriteDto) {
      try {
         await this.productRepository.delete({
            userId: createFavoriteDto.user_id,
            productId: createFavoriteDto.product_id,
         });
         return ('Remove favorite successfully');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
