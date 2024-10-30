import { AccountEntity, DetailInformationEntity, RoleEntity } from './auth';
import { CategoryEntity } from './ecommerce/category.entity';
import { ProductEntity, FavoriteEntity, ListOptionEntity } from './ecommerce/index';
import { OptionEntity } from './ecommerce/option.entity';

export const entities = [
   AccountEntity,
   DetailInformationEntity,
   RoleEntity,
   ProductEntity,
   FavoriteEntity,
   CategoryEntity,
   OptionEntity,
   ListOptionEntity,
];
