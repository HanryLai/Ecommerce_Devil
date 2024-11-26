import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@/entities/ecommerce';
import { OrderModule } from '../order/order.module';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [TypeOrmModule.forFeature([OrderEntity]), OrderModule, JWTModule],
   controllers: [PaymentController],
   providers: [PaymentService],
})
export class PaymentModule {}
