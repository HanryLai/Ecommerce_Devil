import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { AccountEntity } from '../auth';
import { BaseEntity } from '../base';
import { IRoom } from '../interfaces';
import { MessageEntity } from './message.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity<IRoom> {
   @OneToOne(() => AccountEntity, { nullable: false })
   @JoinColumn({ name: 'account_id' })
   account: AccountEntity;

   @OneToMany(() => MessageEntity, (message) => message.room)
   messages: MessageEntity[];
}
