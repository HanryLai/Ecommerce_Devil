import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController, MessageResponse } from 'src/common/base';

@Controller('product')
export class ProductController extends BaseController{
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Get()
  public async findAll(): Promise<MessageResponse> {
    return this.OkResponse(await this.productService.findAll());
  }
}
