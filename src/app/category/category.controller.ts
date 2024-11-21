import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
   UseInterceptors,
   Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { BaseController, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController extends BaseController {
   constructor(private readonly categoryService: CategoryService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post()
   public async create(@Body() body: CreateCategoryDto): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.create(body),
         'Category has been created',
      );
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Put(':id')
   public async update(
      @Param('id') id: string,
      @Body() body: UpdateCategoryDto,
   ): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.update(id, body),
         'Category has been updated',
      );
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.createSuccessResponse(await this.categoryService.findAll(), 'Categories found');
   }

   @Get(':id')
   public async findProductByCategory(@Param('id') productId: string): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.findProductsByCategory(productId),
         'Categories of product has been found',
      );
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Delete(':id')
   public async remove(@Param('id') id: string): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.removeCategory(id),
         'Category has been removed',
      );
   }
}
