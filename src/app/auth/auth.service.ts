import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HandleException } from 'src/common/responses/HandleException.response';
import { DetailInformationEntity, RoleEntity } from 'src/entities/auth';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { AccountRepository } from 'src/repositories/auth';
import { EntityManager } from 'typeorm';
import { RoleService } from '../role/role.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MessageResponse } from 'src/common/responses/MessageResponse.response';
@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      private entityManager: EntityManager,
      private jwtService: JwtService,

      @Inject() private readonly roleService: RoleService,
   ) {}

   public async register(createAuthDto: CreateAuthDto) {
      try {
         const salt = bcrypt.genSaltSync(10);
         const passwordHashed = bcrypt.hashSync(createAuthDto.password, salt);
         const accountModel = this.accountRepository.create({
            ...createAuthDto,
            password: passwordHashed,
         });
         const detailInformation = new DetailInformationEntity();
         const role = await this.roleService.findRoleByName('customer');
         // if (role instanceof Error) throw role;
         console.log(role);
         // await this.registerTransaction(accountModel, detailInformation, role as RoleEntity);
         // throw new HandleException('asdasd', 301).errorMessage();
         return new MessageResponse('register successfully', 201, { name: 'sdfsdf' });
      } catch (error: any) {
         const statusCode = error.statusCode || 500;
         throw new HandleException(error.message, statusCode);
      }
   }

   async registerTransaction(
      account: AccountEntity,
      detailInformation: DetailInformationEntity,
      role: RoleEntity,
   ) {
      try {
         await this.entityManager.transaction(async (entityManager: EntityManager) => {
            await this.entityManager.save({
               ...account,
               detailInformation: detailInformation,
               role: role,
            });
            await this.entityManager.save(detailInformation);
            await this.entityManager.save(role);
         });
      } catch (error) {
         throw error;
      }
   }
}
