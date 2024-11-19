import { Module } from '@nestjs/common';
import { ListOptionService } from './list-option.service';
import { ListOptionController } from './list-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListOptionEntity } from 'src/entities/ecommerce';
import { JWTModule } from '../auth/jwt';

@Module({
   imports: [TypeOrmModule.forFeature([ListOptionEntity]), JWTModule],
   controllers: [ListOptionController],
   providers: [ListOptionService],
})
export class ListOptionModule {}
