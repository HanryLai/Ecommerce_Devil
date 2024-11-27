import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFeedbackDto {
   @ApiProperty()
   @IsNumber()
   rating: number;

   @ApiProperty()
   comment: string;

   @ApiProperty()
   @IsString()
   image_url: string;
}
