import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsEmail()
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
