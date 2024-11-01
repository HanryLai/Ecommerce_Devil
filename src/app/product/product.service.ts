import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/repositories/ecommerce';
import { BaseService } from 'src/common/base';
import { EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/ecommerce';

@Injectable()
export class ProductService extends BaseService {
   constructor(
      @InjectRepository(ProductEntity)
      private productRepository: ProductRepository,
      private entityManager: EntityManager,
   ) {
      super();
   }

   async findAll() {
      try {
         return await this.productRepository.find();
      } catch (error) {
         throw error;
      }
   }

   async findOne(id: string) {
      try {
         return await this.productRepository.findOne({
            where: { id },
         });
      } catch (error) {
         throw error;
      }
   }

   async loadProduct(page: number) {
      const limit = 10;
      const offset = (page - 1) * limit;
      const [listProduct, totalProduct] = await this.productRepository.findAndCount({
         take: limit,
         skip: offset,
      });
      const totalPage = Math.ceil(totalProduct / limit);
      const totalFavoriteOfPage = listProduct.length;
      return {
         message: 'Found list favorite',
         metadata: {
            favorites: listProduct,
            numberPage: parseInt(page.toString()),
            limit: limit,
            totalPage: totalPage,
            totalFavoriteOfPage: totalFavoriteOfPage,
         },
      };
   }

   async update(id: string, updateProductDto: UpdateProductDto) {
      try {
         const product = await this.productRepository.findOne({
            where: { id },
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

   async remove(id: string) {
      try {
         const product = await this.productRepository.findOne({
            where: { id },
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
