import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTModule } from '../auth/jwt';
import { CategoryEntity, FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';

@Module({
   imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity, FeedbackEntity]), JWTModule],
   controllers: [CategoryController],
   providers: [CategoryService],
})
export class CategoryModule {}
