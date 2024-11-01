import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';
import { IsString } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
   @ApiProperty()
   @IsString()
   name: string;

   @ApiProperty({ required: false })
   description?: string;
}
