import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base';
import { OrderItemEntity } from './order_item.entity';
import { AccountEntity } from '../auth';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity<OrderEntity> {
   @CreateDateColumn()
   order_date: Date;

   @Column({ type: 'double' })
   total_price: number;

   @Column({ type: 'nvarchar' })
   full_name: string;

   @Column({ type: 'nvarchar' })
   phone: string;

   @Column({ type: 'nvarchar' })
   address: string;

   @Column({ type: 'nvarchar' })
   account_id: string;

   @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
   orderItems: OrderItemEntity[]

   @ManyToOne(() => AccountEntity, (account) => account.orders)
   @JoinColumn({ name: 'account_id' })
   account: AccountEntity;
}
