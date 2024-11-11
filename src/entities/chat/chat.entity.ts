import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../base";
import { AccountEntity } from "../auth";
import { MessageEntity } from "./message.entity";

@Entity({ name: 'chat' })
export class ChatEntity extends BaseEntity<ChatEntity> {
   @ManyToOne(() => AccountEntity, (account) => account.account)
   @JoinColumn({ name: 'account_id' })
   account_id: AccountEntity;

   @ManyToOne(() => AccountEntity, (account) => account.admin)
   @JoinColumn({ name: 'admin_id' })
   admin_id: AccountEntity;

   @OneToMany(() => MessageEntity, (message) => message.chat)
   messages: MessageEntity[];
}