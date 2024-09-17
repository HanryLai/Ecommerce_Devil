import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/auth';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity])],
   providers: [RoleService],
   exports: [RoleService],
})
export class RoleModule {}
