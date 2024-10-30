import { IBaseEntity } from "./base.entities.interface";

export interface IFavoriteEntity extends IBaseEntity {
    user_id: string;
    product_id: string;
}