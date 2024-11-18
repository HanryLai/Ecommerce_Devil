import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateDetailInformationDto {
   @ApiProperty()
   @IsString()
   @IsOptional()
   phone?: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   full_name?: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   address?: string;

   @ApiProperty()
   @IsString()
   @IsOptional()
   avatar_url?: string;
}
