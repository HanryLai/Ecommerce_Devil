import { AccountEntity, DetailInformationEntity, RoleEntity } from './auth';
import { MessageEntity, RoomEntity } from './chat';
import {
   CartItemEntity,
   CategoryEntity,
   FavoriteEntity,
   ListOptionEntity,
   OptionCartEntity,
   OptionEntity,
   ProductEntity,
   ShoppingCartEntity,
} from './ecommerce';
import { FavoriteEntity, ProductEntity, FeedbackEntity } from './ecommerce';

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
];
