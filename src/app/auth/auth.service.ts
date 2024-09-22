import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/base/service.base';
import { DetailInformationEntity, RoleEntity } from 'src/entities/auth';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { AccountRepository } from 'src/repositories/auth';
import { EntityManager, In } from 'typeorm';
import { RoleService } from '../role/role.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { TransformDataQuery } from '../../common/queries/findAccount.dto';
@Injectable()
export class AuthService extends BaseService {
   constructor(
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      private entityManager: EntityManager,
      private jwtService: JwtService,

      @Inject() private readonly roleService: RoleService,
   ) {
      super();
   }

   public async register(createAuthDto: CreateAuthDto): Promise<AccountEntity> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: [{ username: createAuthDto.username }, { email: createAuthDto.email }],
         });
         if (foundAccount) return this.throwConflict('Email or username existed');
         const salt = await bcrypt.genSalt(10);
         const passwordHashed = await bcrypt.hash(createAuthDto.password, salt);
         const accountModel = this.accountRepository.create({
            ...createAuthDto,
            password: passwordHashed,
         });
         const roleFound = await this.roleService.findRoleByName('Customer');
         return await this.registerTransaction(accountModel, roleFound);
      } catch (error) {
         this.throwInternalServerError(error);
      }
   }

   public async registerTransaction(account: AccountEntity, role: RoleEntity) {
      try {
         return await this.entityManager.transaction(async (entityManager: EntityManager) => {
            const detailInformationModel = entityManager.create(DetailInformationEntity);
            const detailInformation = await entityManager.save(detailInformationModel);
            const accountCreate = entityManager.create(AccountEntity, {
               ...account,
               detailInformation: detailInformation,
               role: role,
            });
            const accountSave = await entityManager.save(accountCreate);
            return accountSave;
         });
      } catch (error) {
         throw this.throwInternalServerError('Error: transaction register');
      }
   }

   public async login(loginDto: CreateAuthDto): Promise<AccountEntity | BaseService> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: [{ username: loginDto.username }, { email: loginDto.email }],
         });
         if (!foundAccount) throw this.throwNotFound('Cannot found this account');
         return foundAccount;
      } catch (error) {
         console.log(error);
         throw this.throwError(400, 'Error: Cannot login');
      }
   }
}
