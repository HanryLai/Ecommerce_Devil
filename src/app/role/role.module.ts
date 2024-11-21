import { RoleEntity } from '@/entities/auth';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity])],
   providers: [RoleService],
   exports: [RoleService],
})
export class RoleModule {}
