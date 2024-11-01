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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { BaseController, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController extends BaseController {
   constructor(private readonly categoryService: CategoryService) {
      super();
   }

   @Post()
   public async create(@Body() body: CreateCategoryDto): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.create(body),
         'Category has been created',
      );
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.createSuccessResponse(await this.categoryService.findAll(), 'Categories found');
   }

   @Get(':id')
   public async findCategoriesOfProduct(@Param('id') productId: string): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.categoryService.findCategoriesOfProduct(productId),
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
