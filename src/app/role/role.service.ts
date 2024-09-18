import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/repositories/auth/role.repository';
import { RoleEntity } from 'src/entities/auth';
import { Like } from 'typeorm';

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

   public async findRoleByName(name: string): Promise<RoleEntity|Error> {
      try {
         const foundRole = this.roleRepository.findOne({
            where: {
               name: Like(name),
            },
         });
         if (foundRole) return foundRole;
         return new Error('This role not existed');
      } catch (error) {
         throw error;
      }
   }
}
