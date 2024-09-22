import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base';
import { IDetailInformationEntity } from '../interfaces';

@Entity('detail_information')
export class DetailInformationEntity
   extends BaseEntity<DetailInformationEntity>
   implements IDetailInformationEntity
{
   @Column({ type: 'varchar', nullable: true })
   phone: string;
   @Column({ type: 'varchar', nullable: true })
   full_name: string;
   @Column({ type: 'varchar', nullable: true })
   address: string;
   @Column({ type: 'varchar', nullable: true })
   avatar_url: string;
}
