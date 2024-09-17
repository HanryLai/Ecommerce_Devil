import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/auth/role.entity';
import { RoleRepository } from '../../repositories/auth';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RoleService', () => {
   let service: RoleService;
   let roleRepository: RoleRepository;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            RoleService,
            {
               provide: getRepositoryToken(RoleEntity),
               useClass: RoleRepository,
            },
         ],
      }).compile();

      service = module.get<RoleService>(RoleService);
      roleRepository = module.get(getRepositoryToken(RoleEntity));
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
   describe('createModelRole', () => {
      it('should create a role model', () => {
         const updateRoleDto: UpdateRoleDto = { name: 'Admin', description: 'Administrator role' };
         const roleEntity = { id: '1', ...updateRoleDto } as RoleEntity;

         jest.spyOn(roleRepository, 'create').mockReturnValue(roleEntity);

         const result = service.createModelRole(updateRoleDto);
         expect(result).toEqual(roleEntity);
         expect(roleRepository.create).toHaveBeenCalledWith(updateRoleDto);
      });

      it('should throw an error if repository create fails', () => {
         const updateRoleDto: UpdateRoleDto = { name: 'Admin', description: 'Administrator role' };

         jest.spyOn(roleRepository, 'create').mockImplementation(() => {
            throw new Error('Repository create error');
         });

         expect(() => service.createModelRole(updateRoleDto)).toThrow('Repository create error');
      });
   });
});
