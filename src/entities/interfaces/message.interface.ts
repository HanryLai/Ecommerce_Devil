import { IBaseEntity } from ".";

export interface IMessageEntity extends IBaseEntity {
    senderId: string;
    message: string;
    chatId: string;
}