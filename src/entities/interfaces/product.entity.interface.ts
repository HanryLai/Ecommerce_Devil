import { IBaseEntity } from './base.entities.interface';

export interface IProductEntity extends IBaseEntity {
   name: string;
   description: string;
   image_url: string;
   price: number;
}
