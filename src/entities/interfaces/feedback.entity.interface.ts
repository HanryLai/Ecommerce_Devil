import { IBaseEntity } from './base.entities.interface';

export interface IFeedbackEntity extends IBaseEntity {
   user_id: string;
   product_id: string;
   image_url: string;
   rating: number;
   comment: string;
}
