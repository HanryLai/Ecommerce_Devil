import { ApiProperty } from '@nestjs/swagger';
import { IRoleEntity } from 'src/entities/interfaces';

export class CreateRoleDto {
   @ApiProperty({ type: 'string' })
   name: string;
   @ApiProperty({ type: 'string' })
   description: string;
}
