import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/base';
import { CurrentUserDto } from 'src/common/interceptor';
import { AccountEntity, DetailInformationEntity, RoleEntity } from 'src/entities/auth';
import { AccountRepository } from 'src/repositories/auth';
import { EmailService } from 'src/utils/email/email.service';
import { EntityManager } from 'typeorm';
import { CloudinaryService } from '../../utils/cloudinary/cloudinary.service';
import { RoleService } from '../role/role.service';
import { CreateAuthDto, LoginDto } from './dto';
import { JWTService } from './jwt';
@Injectable()
export class AuthService extends BaseService {
   constructor(
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      private entityManager: EntityManager,
      private jwtService: JWTService,
      @Inject() private readonly fileService: CloudinaryService,
      @Inject() private readonly roleService: RoleService,
      @Inject() private readonly emailService: EmailService,
   ) {
      super();
   }

   public async register(
      createAuthDto: CreateAuthDto,
      role?: string | 'customer',
   ): Promise<AccountEntity> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: [
               { username: createAuthDto.username, isActive: true },
               { username: createAuthDto.email, isActive: true },
               { email: createAuthDto.email, isActive: true },
               { email: createAuthDto.username, isActive: true },
            ],
         });
         if (foundAccount) this.ConflictException('Email or username existed');
         const salt = await bcrypt.genSalt(10);
         const passwordHashed = await bcrypt.hash(createAuthDto.password, salt);
         const accountModel = this.accountRepository.create({
            ...createAuthDto,
            password: passwordHashed,
         });
         if (!role) role = 'customer';
         const roleFound = await this.roleService.findRoleByName(role);
         await this.emailService.sendUserConfirmation(accountModel);
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

   public async login(loginDto: LoginDto): Promise<AccountEntity> {
      try {
         const identifier = loginDto.identifier;
         const foundAccount = await this.accountRepository.findOne({
            where: [{ username: identifier }, { email: identifier }],
            select: ['id', 'username', 'email', 'password', 'role'],
            relations: ['role'],
         });

         if (!foundAccount) this.NotFoundException('Wrong account or password');
         const comparePassword = await bcrypt.compare(loginDto.password, foundAccount.password);
         if (comparePassword === false) this.NotFoundException('Wrong account or password');
         const payload = {
            id: foundAccount.id,
            username: foundAccount.username,
            email: foundAccount.email,
            roleName: foundAccount.role.name,
         };
         const { accessToken, refreshToken } = await this.jwtService.generateToken(payload);

         const updateResult = await this.accountRepository.update(
            { id: foundAccount.id },
            { refreshToken, accessToken },
         );
         if (!updateResult.affected) this.BadGatewayException('Update failed');
         delete foundAccount.password;
         return {
            ...foundAccount,
            refreshToken,
            accessToken,
         };
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async logout(user: CurrentUserDto): Promise<boolean> {
      try {
         if (!user) this.UnauthorizedException('Invalid account');
         const updateResult = await this.accountRepository.update(
            { id: user.id },
            { refreshToken: null, accessToken: null },
         );
         if (!updateResult.affected) this.BadGatewayException('Update failed');
         return true;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async findAccountById(user: CurrentUserDto): Promise<AccountEntity> {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: { id: user.id },
         });
         if (!foundAccount) this.NotFoundException('Not found this account');
         return foundAccount;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   public async updatePassword(
      user: CurrentUserDto,
      currentPassword: string,
      newPassword: string,
   ): Promise<AccountEntity> {
      try {
         const foundAccount = await this.findAccountById(user);
         if (!foundAccount?.id) this.BadRequestException('Not found this account');
         const isPasswordValid = await bcrypt.compare(currentPassword, foundAccount.password);
         if (isPasswordValid == false) this.NotFoundException('Current password is wrong !');
         const salt = bcrypt.genSaltSync(10);
         const newPassHash = bcrypt.hashSync(newPassword, salt);
         foundAccount.password = newPassHash;
         const result = await this.accountRepository.save(foundAccount);
         return result;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   TestService() {
      return 'Chua co gi test';
   }
}
