import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AccountEntity } from '../auth';
import { BaseEntity } from '../base';
import { RoomEntity } from './room.entity';
import { IMessage } from '../interfaces/message.entity.interface';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity<IMessage> {
   @Column({ type: 'nvarchar' })
   content: string;

   @ManyToOne(() => AccountEntity, (account) => account.messages)
   @JoinColumn({ name: 'account' })
   account: AccountEntity;

   @ManyToOne(() => RoomEntity, (room) => room.messages)
   room: RoomEntity;
}
