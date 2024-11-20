import { AccountEntity, DetailInformationEntity, RoleEntity } from './auth';
import { MessageEntity, RoomEntity } from './chat';
import {
   CartItemEntity,
   CategoryEntity,
   FavoriteEntity,
   ListOptionEntity,
   OptionCart,
   OptionEntity,
   ProductEntity,
   ShoppingCartEntity,
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
   OptionCart,
   CategoryEntity,
   OptionEntity,
   ListOptionEntity,
];
