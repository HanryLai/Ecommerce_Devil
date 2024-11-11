import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base";
import { AccountEntity } from "../auth";
import { ChatEntity } from "./chat.entity";

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity<MessageEntity> {
    @ManyToOne(() => AccountEntity, (account) => account.account)
    @JoinColumn({ name: 'sender_id' })
    senderId: string;

    message: string;

    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    @JoinColumn({ name: 'chat_id' })
    chat: ChatEntity

}