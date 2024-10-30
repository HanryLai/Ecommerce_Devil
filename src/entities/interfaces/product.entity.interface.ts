import { IBaseEntity } from './base.entities.interface';

export interface IProductEntity extends IBaseEntity {
   name: string;
   description: string;
   categories: string;
   image_url: string;
   option_id: string;
   price: number;
}
