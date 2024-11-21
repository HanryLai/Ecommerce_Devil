import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base';
import { AccountEntity } from '../auth';
import { ProductEntity } from './product.entity';

@Entity({ name: 'feedbacks' })
export class FeedbackEntity extends BaseEntity<FeedbackEntity> {
   @Column({ type: 'nvarchar', default: null })
   image_url: string;

   @Column({ type: 'int' })
   rating: number;

   @Column({ type: 'nvarchar', default: null })
   comment: string;

   @ManyToOne(() => AccountEntity, (account) => account.feedbacks)
   @JoinColumn({ name: 'account_id' })
   account: AccountEntity;

   @ManyToOne(() => ProductEntity, (product) => product.feedbacks)
   @JoinColumn({ name: 'product_id' })
   product: ProductEntity;
}
