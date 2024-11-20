import { IBaseEntity } from "./base.entities.interface";

export interface IShoppingCartEntity extends IBaseEntity {
    id: string;
    account_id: string;
}