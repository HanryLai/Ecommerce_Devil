import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/repositories/ecommerce';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([ProductRepository])],
   controllers: [ProductController],
   providers: [ProductService],
})
export class ProductModule {}
