import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartItemEntity, FeedbackEntity, OrderEntity, OrderItemEntity } from '@/entities/ecommerce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailInformationEntity } from '@/entities/auth';
import { AuthModule } from '../auth';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, CartItemEntity, FeedbackEntity]),
      AuthModule,
      JWTModule,
   ],
   controllers: [OrderController],
   providers: [OrderService],
   exports: [OrderService],
})
export class OrderModule {}
