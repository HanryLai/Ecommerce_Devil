import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOrderNowDto {
   @ApiProperty()
   @IsString({ each: true })
   productId: string;

   @ApiProperty()
   @IsInt()
   quantity: number;

   @ApiProperty()
   @IsString({ each: true })
   listOptions: string[];
}
