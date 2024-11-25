import { IBaseEntity } from './base.entities.interface';

export interface IOrder extends IBaseEntity {
   order_date: Date;
   total_price: number;
   full_name: string;
   phone: string;
   address: string;
}
