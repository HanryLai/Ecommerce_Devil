import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
   // // implements IProductEntity
   // @ApiProperty()
   // @IsString()
   // @IsNotEmpty()
   // name: string;

   // @ApiProperty()
   // @IsString()
   // description: string;
   // // categories: string;
   // // image_url: string;
   // // option_id: string;

   // @ApiProperty()
   // price: number;
   // // id: string;
   // // isActive: boolean;
   // // createdAt: Date;
   // // updatedAt: Date;

   @ApiProperty()
   name: string;

   @ApiProperty()
   description: string;

   @ApiProperty()
   price: number;
}
