import { AccountEntity, DetailInformationEntity, RoleEntity } from './auth';
import { MessageEntity, RoomEntity } from './chat';
import { FavoriteEntity, ProductEntity, CartItemEntity, ShoppingCartEntity, OptionCart } from './ecommerce';
import {
   CategoryEntity,
   FavoriteEntity,
   ListOptionEntity,
   OptionEntity,
   ProductEntity,
} from './ecommerce';

export const entities = [
   AccountEntity,
   DetailInformationEntity,
   RoleEntity,
   ProductEntity,
   FavoriteEntity,
   RoomEntity,
   MessageEntity,
   ShoppingCartEntity,
   CartItemEntity,
   OptionCart
   CategoryEntity,
   OptionEntity,
   ListOptionEntity,
];
