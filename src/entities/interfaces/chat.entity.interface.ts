import { IBaseEntity } from "./base.entities.interface";

export interface IChatEntity extends IBaseEntity{
    userId: string;
    adminId: string;
}