import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListOptionDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   description: string;

   @ApiProperty()
   @IsNotEmpty()
   adjustPrice: number;

   @ApiProperty()
   @IsNotEmpty()
   quantity: number;
}
