import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateItemCartDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsInt()
   quantity: number;
}
