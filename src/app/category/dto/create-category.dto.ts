import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   title: string;
   @ApiProperty()
   @IsString()
   image: string;
   @ApiProperty()
   @IsString()
   description: string;
}
