import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
   @ApiProperty({
      type: 'string',
   })
   email: string;

   @ApiProperty({
      type: 'string',
   })
   username: string;

   @ApiProperty({
      type: 'string',
   })
   password: string;
}
