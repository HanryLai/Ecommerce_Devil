import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTModule } from '../auth/jwt';
import { OptionEntity, ProductEntity } from 'src/entities/ecommerce';

@Module({
   imports: [TypeOrmModule.forFeature([OptionEntity, ProductEntity]), JWTModule],
   controllers: [OptionController],
   providers: [OptionService],
})
export class OptionModule {}
