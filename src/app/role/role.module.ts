import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/auth';
import { RoleService } from '.';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity])],
   providers: [RoleService],
   exports: [RoleService],
})
export class RoleModule {}
