import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartEntity } from 'src/entities/ecommerce';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartEntity])],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
