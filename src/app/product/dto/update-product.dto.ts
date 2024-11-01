import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateProductDto {
   @ApiProperty()
   @Optional()
   @IsString()
   name?: string;

   @ApiProperty()
   @Optional()
   @IsString()
   description?: string;

   @ApiProperty()
   @Optional()
   @IsNumber()
   price?: number;
}
