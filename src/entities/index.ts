import { AccountEntity, DetailInformationEntity, RoleEntity } from './auth';
import { MessageEntity, RoomEntity } from './chat';
import {
   CartItemEntity,
   CategoryEntity,
   FavoriteEntity,
   FeedbackEntity,
   ListOptionEntity,
   OptionCartEntity,
   OptionEntity,
   ProductEntity,
   ShoppingCartEntity,
   OrderEntity,
   OrderItemEntity
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
   OptionCartEntity,
   CategoryEntity,
   OptionEntity,
   ListOptionEntity,
   FeedbackEntity,
   OrderEntity,
   OrderItemEntity
];
