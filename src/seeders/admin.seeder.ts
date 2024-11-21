import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth';
import { BaseService } from 'src/common/base';
import { AccountEntity, DetailInformationEntity } from 'src/entities/auth';
import { AccountRepository, DetailInformationRepository } from 'src/repositories/auth';

export class AdminSeeder extends BaseService {
   constructor(
      @Inject() private authService: AuthService,
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      @InjectRepository(DetailInformationEntity)
      private detailInformationRepository: DetailInformationRepository,
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

         console.log('AdminSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
