import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   email: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   username: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;
}
