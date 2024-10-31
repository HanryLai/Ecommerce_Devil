import { ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   user_id: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   product_id: string;
}
