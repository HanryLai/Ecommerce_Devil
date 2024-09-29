import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DetailInformationEntity, RoleEntity } from 'src/entities/auth';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { AccountRepository } from 'src/repositories/auth';
import { EntityManager } from 'typeorm';
import { RoleService } from '../role/role.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { BaseService } from 'src/common/base/baseService.base';
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
            where: [
               { username: createAuthDto.username, isActive: true },
               { email: createAuthDto.email, isActive: true },
            ],
         });
         if (foundAccount) throw new Error('Email or username existed');
         const salt = await bcrypt.genSalt(10);
         const passwordHashed = await bcrypt.hash(createAuthDto.password, salt);
         const accountModel = this.accountRepository.create({
            ...createAuthDto,
            password: passwordHashed,
         });
         const roleFound = await this.roleService.findRoleByName('Customer');
         return await this.registerTransaction(accountModel, roleFound);
      } catch (error) {
         this.ThrowError(error);
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
         throw new Error('Error: transaction register');
      }
   }

   public async login(loginDto: CreateAuthDto): Promise<AccountEntity> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: [{ username: loginDto.username }, { email: loginDto.email }],
         });
         if (!foundAccount) throw new Error('Cannot found this account');
         const comparePassword = await bcrypt.compare(loginDto.password, foundAccount.password);
         if (comparePassword === false) throw new Error('Wrong password');
         const payload = {
            id: foundAccount.id,
         };
         this.generateToken(payload);

         // this.ForbiddenException('Test success');
         return foundAccount;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async generateToken(payloadData: Record<string, any>): Promise<{
      accessToken: string;
      refreshToken: string;
   }> {
      const accessTokenSync = this.jwtService.sign(payloadData, {
         expiresIn: '1d',
         secret: process.env.JWT_SECRET,
      });
      const refreshTokenSync = this.jwtService.sign(payloadData, {
         expiresIn: '30d',
         secret: process.env.JWT_SECRET,
      });
      const [accessToken, refreshToken] = await Promise.all([accessTokenSync, refreshTokenSync]);
      return { accessToken, refreshToken };
   }
}
