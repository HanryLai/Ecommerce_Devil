import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartItemEntity, FeedbackEntity, ListOptionEntity, OptionEntity, OrderEntity, OrderItemEntity, ProductEntity } from '@/entities/ecommerce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailInformationEntity } from '@/entities/auth';
import { AuthModule } from '../auth';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, CartItemEntity, FeedbackEntity, ProductEntity, OptionEntity, ListOptionEntity]),
      AuthModule,
      JWTModule
   ],
   controllers: [OrderController],
   providers: [OrderService],
})
export class OrderModule {}
