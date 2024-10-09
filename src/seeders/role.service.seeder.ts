import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/auth';
import { RoleRepository } from 'src/repositories/auth';

export class RoleSeeder implements OnModuleInit {
   @InjectRepository(RoleEntity)
   private readonly roleRepository: RoleRepository;

   async onModuleInit() {
      try {
         const roles = ['admin', 'customer'];
         const descriptions = [
            'Admin who management of e-commercial market',
            'Customer who access market to buy something',
         ];
         for (let i = 0; i < roles.length; i++) {
            const roleExists = await this.roleRepository.findOne({
               where: { name: roles[i] },
            });
            if (!roleExists) {
               const roleModel = this.roleRepository.create({
                  name: roles[i],
                  description: descriptions[i],
               });
               await this.roleRepository.save(roleModel);
            }
         }
      } catch (error) {
         throw error;
      }
   }
}
