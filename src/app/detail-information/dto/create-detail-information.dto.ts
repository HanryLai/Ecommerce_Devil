import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateDetailInformationDto {
   @ApiProperty()
   @IsPhoneNumber()
   @IsNotEmpty()
   phone: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   full_name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   address: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   avatar_url: string;
}
