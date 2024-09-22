import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/auth';
import { RoleRepository } from 'src/repositories/auth/role.repository';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Like } from 'typeorm';
import { BaseService } from 'src/common/base/service.base';

@Injectable()
export class RoleService extends BaseService {
   constructor(@InjectRepository(RoleEntity) private roleRepository: RoleRepository) {
      super();
   }

   public createModelRole(updateRoleDto: UpdateRoleDto): RoleEntity {
      try {
         return this.roleRepository.create({ ...updateRoleDto });
      } catch (error) {
         this.throwError(500, 'create module of role');
      }
   }

   public async findRoleByName(name: string): Promise<RoleEntity> {
      try {
         const foundRole = await this.roleRepository.findOne({
            where: {
               name: Like(name),
            },
         });
         if (!foundRole) this.throwNotFound('Not found this role');
         return foundRole;
      } catch (error) {
         this.throwError(500, 'Error: find role by name');
      }
   }
}
