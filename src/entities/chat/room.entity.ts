import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AccountEntity } from '../auth';
import { BaseEntity } from '../base';
import { IRoom } from '../interfaces';
import { MessageEntity } from './message.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity<IRoom> {
   @Column({ name: 'room_name', unique: true })
   room_name: string;
   @ManyToMany(() => AccountEntity)
   @JoinTable({ name: 'room_account' })
   accounts: AccountEntity[];

   @OneToMany(() => MessageEntity, (message) => message.room)
   messages: MessageEntity[];
}
