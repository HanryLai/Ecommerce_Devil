import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController, MESSAGERESPONSE, MessageResponse } from 'src/common/base';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController extends BaseController {
   constructor(private readonly productService: ProductService) {
      super();
   }

   @Get('searchProduct/:keyword')
   @ApiResponse({ status: '2XX', description: 'Search product by keyword' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async searchProduct(@Param('keyword') keyword: string): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.searchProduct(keyword),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Get('searchProductByPriceRange/:minPrice/:maxPrice')
   @ApiResponse({ status: '2XX', description: 'Search product by price range' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async searchProductByPriceRange(
      @Param('minPrice') minPrice: number,
      @Param('maxPrice') maxPrice: number,
   ): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.searchProductByPriceRange(minPrice, maxPrice),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Get()
   @ApiResponse({ status: '2XX', description: 'Get all products' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async findAll(): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findAll());
   }

   @Get(':productId')
   @ApiResponse({ status: '2XX', description: 'Get product by id' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async findOne(@Param('productId') productId: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.findOne(productId), MESSAGERESPONSE.QUERIED);
   }

   @Get('relationProduct')
   @ApiResponse({ status: '2XX', description: 'Get relation product' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async relationProduct(): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.relationProduct());
   }

   @Get('paginate/:page')
   @ApiResponse({ status: '2XX', description: 'Load product by page' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(200)
   public async loadProduct(@Param('page') page: string): Promise<MessageResponse> {
      return this.OkResponse(
         await this.productService.loadProduct(parseInt(page)),
         MESSAGERESPONSE.QUERIED,
      );
   }

   @Patch(':productId')
   @ApiResponse({ status: '2XX', description: 'Update product by id' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @ApiBody({ type: UpdateProductDto })
   @HttpCode(201)
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
   @ApiResponse({ status: '2XX', description: 'Delete product by id' })
   @ApiResponse({ status: '4XX', description: 'Product not found' })
   @ApiResponse({ status: '5XX', description: 'Internal server error' })
   @HttpCode(201)
   public async remove(@Param('productId') productId: string): Promise<MessageResponse> {
      return this.OkResponse(await this.productService.remove(productId), MESSAGERESPONSE.DELETED);
   }
}
