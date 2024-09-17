import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from 'src/repositories/auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AccountEntity } from 'src/entities/auth/account.entity';
import { DetailInformationEntity, RoleEntity } from 'src/entities/auth';
import { RoleService } from '../role/role.service';
import { ROLE_ENUM } from 'src/common/enums';
@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,

      private jwtService: JwtService,

      @Inject() private readonly roleService: RoleService,
   ) {}

   async register(createAuthDto: CreateAuthDto) {
      const salt = bcrypt.genSaltSync(10);
      const passwordHashed = bcrypt.hashSync(createAuthDto.password, salt);
      const accountModel = this.accountRepository.create({
         ...createAuthDto,
         password: passwordHashed,
      });

      const detailInformation = new DetailInformationEntity();
   }

   async registerTransaction(
      account: AccountEntity,
      detailInformation: DetailInformationEntity,
      role: RoleEntity,
   ) {}
}
