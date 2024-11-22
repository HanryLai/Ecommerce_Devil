import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IAccountEntity } from '../interfaces';
import { BaseEntity } from '../base';
import { DetailInformationEntity, RoleEntity } from '.';
import { FavoriteEntity } from '../ecommerce/favorite.entity';
import { MessageEntity, RoomEntity } from '../chat';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity<AccountEntity> implements IAccountEntity {
   @Column({ type: 'varchar', unique: true })
   email: string;
   @Column({ type: 'varchar', unique: true })
   username: string;
   @Column({ type: 'varchar' })
   password: string;

   @Column({ type: 'boolean', default: false })
   isVerify: boolean;

   @Column({ type: 'longtext', name: 'access_token', nullable: true })
   accessToken: string;
   @Column({ type: 'longtext', name: 'refresh_token', nullable: true })
   refreshToken: string;

   @OneToOne(() => DetailInformationEntity)
   @JoinColumn({ name: 'detail_information_id' })
   detailInformation: DetailInformationEntity;

   @ManyToOne(() => RoleEntity, (role) => role.accounts)
   @JoinColumn({ name: 'role_id' })
   role: RoleEntity;

   @OneToOne(() => FavoriteEntity)
   favorite: FavoriteEntity;

   @OneToMany(() => MessageEntity, (message) => message.account)
   messages: MessageEntity[];

   @OneToOne(() => RoomEntity, (room) => room.account)
   room: RoomEntity;
}
