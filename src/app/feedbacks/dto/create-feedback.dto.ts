import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   product_id: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsNumber()
   rating: number;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   comment: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   image_url: string;
}
