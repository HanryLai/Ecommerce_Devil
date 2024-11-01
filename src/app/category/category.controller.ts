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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseController, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('category')
export class CategoryController extends BaseController {
   constructor(private readonly categoryService: CategoryService) {
      super();
   }

   @Post()
   create(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoryService.create(createCategoryDto);
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.OkResponse(await this.categoryService.findAll());
   }

   @Get(':id')
   public async findOne(@Param('id') id: string): Promise<MessageResponse> {
      return this.OkResponse(this.categoryService.findOne(+id));
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
      return this.categoryService.update(+id, updateCategoryDto);
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Delete(':id')
   public async remove(@Param('id') id: string): Promise<MessageResponse> {
      return this.OkResponse(await this.categoryService.remove(+id));
   }
}
