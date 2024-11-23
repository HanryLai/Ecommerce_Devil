import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class AddItemCartDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   itemId: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsInt()
   quantity: number;

   @ApiProperty()
   @IsString({ each: true })
   listOptionId: string[]
}
