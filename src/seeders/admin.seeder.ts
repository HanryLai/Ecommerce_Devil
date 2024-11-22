import { FakerService } from '@/utils/faker/faker.service';
import { faker } from '@faker-js/faker';
import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/app/auth';
import { BaseService } from 'src/common/base';
import { AccountEntity, DetailInformationEntity } from 'src/entities/auth';
import { AccountRepository, DetailInformationRepository } from 'src/repositories/auth';

export class AdminSeeder extends BaseService {
   constructor(
      @Inject() private authService: AuthService,
      @Inject() private fakerService: FakerService,
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
            const detailInformation = this.fakerService.generateDetailInformation(
               admin.detailInformation,
            );
            await this.detailInformationRepository.save(detailInformation);
            const user = await this.authService.register(
               {
                  email: 'user1@gmail.com',
                  username: 'user1',
                  password: '123',
               },
               'customer',
            );
            const detailInformation2 = await this.detailInformationRepository.findOne({
               where: {
                  id: user.detailInformation.id,
               },
            });

            const update2 = await this.detailInformationRepository.update(detailInformation2.id, {
               full_name: 'KhachHang',
               phone: '0123456789',
               address: 'HCM',
               avatar_url:
                  'https://i.pinimg.com/736x/92/bd/ff/92bdff348aea123776a54c9f6a37e01d.jpg',
            });
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
                  username: 'customer',
                  password: '123',
               },
               'customer',
            );
            const detailInformation = this.fakerService.generateDetailInformation(
               customer.detailInformation,
            );
            await this.detailInformationRepository.save(detailInformation);
            console.log('REGISTER NEW CUSTOMER: ', customer);
            console.log('You can login account customer');
         }
         const foundAccount3 = await this.accountRepository.findOne({
            where: {
               email: 'admin@gmail.com',
            },
         });
         if (!foundAccount3) {
            const admin = await this.authService.register(
               {
                  email: 'admin@gmail.com',
                  username: 'admin2',
                  password: '123',
               },
               'admin',
            );
            const detailInformation = this.fakerService.generateDetailInformation(
               admin.detailInformation,
            );
            await this.detailInformationRepository.save(detailInformation);
            console.log('REGISTER NEW admin: ', admin);
            console.log('You can login account customer');
         }

         console.log('AdminSeeder: Done');
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
