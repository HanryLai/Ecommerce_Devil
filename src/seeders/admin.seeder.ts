import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth';
import { BaseService } from 'src/common/base';
import { AccountEntity } from 'src/entities/auth';
import { AccountRepository } from 'src/repositories/auth';

export class AdminSeeder extends BaseService implements OnModuleInit {
   constructor(
      @Inject() private authService: AuthService,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
   ) {
      super();
   }
   async onModuleInit() {
      try {
         const foundAccount = await this.accountRepository.findOne({
            where: {
               email: 'ldmhieudev@gmail.com',
            },
         });
         if (!foundAccount) {
            const admin = await this.authService.register(
               {
                  email: 'ldmhieudev@gmail.com',
                  username: 'admin',
                  password: '123',
               },
               'admin',
            );
            console.log('REGISTER NEW ADMIN: ', admin);
            console.log('You can login account admin');
         }
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
