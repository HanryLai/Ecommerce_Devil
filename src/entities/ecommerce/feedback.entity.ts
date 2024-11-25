import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base';
import { AccountEntity } from '../auth';
import { ProductEntity } from './product.entity';
import { OrderItemEntity } from './order_item.entity';

@Entity({ name: 'feedbacks' })
export class FeedbackEntity extends BaseEntity<FeedbackEntity> {
   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @Column({ type: 'int', default: 0 })
   rating: number;

   @Column({ type: 'nvarchar', default: null })
   comment: string;

   @Column({ type: 'boolean', default: false })
   isFeedback: boolean;

   @Column({ type: 'nvarchar', default: null })
   orderItem_id: string;

   @ManyToOne(() => AccountEntity, (account) => account.feedbacks)
   @JoinColumn({ name: 'account_id' })
   account: AccountEntity;

   @ManyToOne(() => ProductEntity, (product) => product.feedbacks)
   @JoinColumn({ name: 'product_id' })
   product: ProductEntity;

   @OneToOne(() => OrderItemEntity, (orderItem) => orderItem.feedback)
   orderItem: OrderItemEntity;
}
