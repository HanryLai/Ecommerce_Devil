import { Module } from '@nestjs/common';
import { DetailInformationService } from './detail-information.service';
import { DetailInformationController } from './detail-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, DetailInformationEntity } from 'src/entities/auth';
import { AuthModule } from '../auth';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [
      TypeOrmModule.forFeature([DetailInformationEntity, AccountEntity]),
      AuthModule,
      JWTModule,
   ],
   controllers: [DetailInformationController],
   providers: [DetailInformationService],
})
export class DetailInformationModule {}
