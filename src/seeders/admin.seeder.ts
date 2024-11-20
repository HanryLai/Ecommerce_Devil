import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth';
import { BaseService } from 'src/common/base';
import { AccountEntity } from 'src/entities/auth';
import { AccountRepository } from 'src/repositories/auth';

export class AdminSeeder extends BaseService {
   constructor(
      @Inject() private authService: AuthService,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
   ) {
      super();
   }
   async run() {
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

            const user = await this.authService.register(
               {
                  email: 'user1@gmail.com',
                  username: 'user1',
                  password: '123',
               },
               'customer',
            );
            console.log('REGISTER NEW USER: ', user);
            console.log('You can login account user1');
         }

         const foundAccount2 = await this.accountRepository.findOne({
            where: {
               email: 'customer@gmail.com',
            },
         });
         if (!foundAccount2) {
            const customer = await this.authService.register(
               {
                  email: 'customer@gmail.com',
                  username: 'admin2',
                  password: '123',
               },
               'customer',
            );
            console.log('REGISTER NEW CUSTOMER: ', customer);
            console.log('You can login account customer');
         }

         console.log('AdminSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
