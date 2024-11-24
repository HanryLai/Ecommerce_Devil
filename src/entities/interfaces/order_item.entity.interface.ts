import { IBaseEntity } from "./base.entities.interface";

export interface IOrderItem extends IBaseEntity {
    product_id: string;
    order_id: string;
    quantity: number;
    feedback_id: string;
    single_price: number;
}
