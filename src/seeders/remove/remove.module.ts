import { RoleEntity } from '@/entities/auth';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemoveAllSeeder } from './remove.seeder';

@Module({
   imports: [TypeOrmModule.forFeature([RoleEntity])],
   providers: [RemoveAllSeeder],
   exports: [RemoveAllSeeder],
})
export class RemoveAllDatabaseModule {}
