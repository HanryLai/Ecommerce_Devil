import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity, ProductEntity } from 'src/entities/ecommerce';
import { ProductRepository } from 'src/repositories/ecommerce';
import { ProductModule } from '../product/product.module';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [TypeOrmModule.forFeature([FeedbackEntity, ProductEntity]), JWTModule],
   controllers: [FeedbacksController],
   providers: [FeedbacksService],
})
export class FeedbacksModule {}
