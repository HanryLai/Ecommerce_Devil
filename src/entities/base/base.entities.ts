import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '../interfaces';

export class BaseEntity<T> implements IBaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ default: false })
   isActive: boolean;

   @CreateDateColumn()
   createdAt: Date;
   @UpdateDateColumn()
   updatedAt: Date;
}
