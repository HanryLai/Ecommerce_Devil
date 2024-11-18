import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController extends BaseController {
   constructor(private readonly productService: ProductService) {
      super();
   }

   @Get('searchProduct/:keyword')
   public async searchProduct(@Param('keyword') keyword: string): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.searchProduct(keyword),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findAll());
   }

   @Get(':productId')
   public async findOne(@Param('productId') productId: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findOne(productId), MESSAGERESPONSE.QUERIED);
   }

   @Get('loadProduct/:page')
   public async loadProduct(@Param('page') page: string): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.loadProduct(parseInt(page)),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Patch(':productId')
   public async update(
      @Param('productId') productId: string,
      @Body() updateProductDto: UpdateProductDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.update(productId, updateProductDto),
         MESSAGERESPONSE.UPDATED,
      );
   }

   @Delete(':productId')
   public async remove(@Param('productId') productId: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.remove(productId), MESSAGERESPONSE.DELETED);
   }
}
