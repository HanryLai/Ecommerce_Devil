import { IBaseEntity } from './base.entities.interface';

export interface IProductEntity extends IBaseEntity {
   name: string;
   quantity: number;
   description: string;
   image: string;
}
