import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base';
import { OrderEntity } from './order.entity';
import { FeedbackEntity } from './feedback.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'order_item' })
export class OrderItemEntity extends BaseEntity<OrderItemEntity> {
   @Column({ type: 'nvarchar' })
   product_id: string;

   @Column({ type: 'nvarchar' })
   order_id: string;

   @Column({ type: 'nvarchar' })
   feedback_id: string;

   @Column({ type: 'int' })
   quantity: number;

   @Column({ type: 'double' })
   single_price: number;

   @Column({ type: 'nvarchar', length: 800 })
   product_description: string;

   @ManyToOne(() => ProductEntity, (product) => product.orderItems)
   @JoinColumn({ name: 'product_id' })
   products: ProductEntity;

   @ManyToOne(() => OrderEntity, (order) => order.orderItems)
   @JoinColumn({ name: 'order_id' })
   order: OrderEntity;

   @OneToOne(() => FeedbackEntity, (feedback) => feedback.orderItem)
   @JoinColumn({ name: 'feedback_id' })
   feedback: FeedbackEntity;
}
