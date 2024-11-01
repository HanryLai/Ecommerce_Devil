import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController, MessageResponse } from 'src/common/base';
import { ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController extends BaseController {
   constructor(private readonly productService: ProductService) {
      super();
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findAll());
   }

   @Get(':id')
   public async findOne(@Param('id') id: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findOne(id));
   }

   @Get('loadProduct/:page')
   public async loadProduct(@Param('page') page: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.loadProduct(parseInt(page)));
   }

   @Patch(':id')
   public async update(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.update(id, updateProductDto));
   }

   @Delete(':id')
   public async remove(@Param('id') id: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.remove(id));
   }
}
