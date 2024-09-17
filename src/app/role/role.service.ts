import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/repositories/auth/role.repository';
import { RoleEntity } from 'src/entities/auth';

@Injectable()
export class RoleService {
   constructor(@InjectRepository(RoleEntity) private roleRepository: RoleRepository) {}

   public createModelRole(updateRoleDto: UpdateRoleDto): RoleEntity {
      try {
         return this.roleRepository.create({ ...updateRoleDto });
      } catch (error) {
         throw error;
      }
   }
}
