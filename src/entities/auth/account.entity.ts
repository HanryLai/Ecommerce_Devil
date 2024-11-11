import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IAccountEntity } from '../interfaces';
import { BaseEntity } from '../base';
import { DetailInformationEntity, RoleEntity } from '.';
import { FavoriteEntity } from '../ecommerce/favorite.entity';
import { ChatEntity } from '../chat';

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
   @JoinColumn()
   favorite: FavoriteEntity;

   @OneToMany(()=>ChatEntity, chat => chat.account_id)
   account: ChatEntity;

   @OneToMany(()=>ChatEntity, chat => chat.admin_id)
   admin: ChatEntity;

   @OneToMany(()=>ChatEntity, chat => chat.messages)
   messages: ChatEntity;
}
