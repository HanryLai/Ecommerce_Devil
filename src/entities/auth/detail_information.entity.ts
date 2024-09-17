import { Column, Entity } from 'typeorm';
import { IBaseEntity } from '../interfaces';
import { BaseEntity } from '../base';
import { IDetailInformation } from '../interfaces/detail_information.interface';

@Entity('detail_information')
export class DetailInformationEntity
   extends BaseEntity<DetailInformationEntity>
   implements IDetailInformation
{
   @Column({ type: 'varchar' })
   phone: string;
   @Column({ type: 'varchar' })
   full_name: string;
   @Column({ type: 'varchar' })
   address: string;
   @Column({ type: 'varchar', default: process.env.IMAGE_PATH })
   avatar_url: string;
}
