import { Inject, Injectable } from '@nestjs/common';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';
import { BaseService } from 'src/common/base';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailInformationEntity } from 'src/entities/auth';
import { DetailInformationRepository } from 'src/repositories/auth';
import { AuthService } from '../auth';
import { CurrentUserDto } from 'src/common/interceptor';

@Injectable()
export class DetailInformationService extends BaseService {
   constructor(
      @InjectRepository(DetailInformationEntity)
      private readonly detailInformationRepository: DetailInformationRepository,
      @Inject() private readonly authService: AuthService,
   ) {
      super();
   }

   async findOne(user: CurrentUserDto) {
      try {
         const foundAccount = await this.authService.findMyAccount(user);
         if (!foundAccount) {
            this.ThrowError('Account not found');
         }
         const foundDetailInformation = foundAccount.detailInformation;
         console.log('foundDetailInformation', foundDetailInformation);

         return foundDetailInformation;
      } catch (error) {
         this.ThrowError(error);
      }
   }

   async update(user: CurrentUserDto, updateDto: UpdateDetailInformationDto) {
      try {
         const foundDetailInformation = await this.findOne(user);
         return this.detailInformationRepository.update(foundDetailInformation.id, updateDto);
      } catch (error) {
         this.ThrowError(error);
      }
   }
}
