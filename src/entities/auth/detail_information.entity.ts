import { Entity } from 'typeorm';
import { IBaseEntity } from '../interfaces';

@Entity('detail_information')
export class DetailInformationEntity extends IBaseEntity {}
