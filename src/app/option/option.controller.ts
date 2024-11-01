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
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { BaseController, MessageResponse } from 'src/common/base';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor';

@ApiTags('Option')
@Controller('option')
export class OptionController extends BaseController {
   constructor(private readonly optionService: OptionService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post()
   public async create(@Body() createOptionDto: CreateOptionDto): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.optionService.create(createOptionDto),
         'Option created',
      );
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Patch(':id')
   public async update(
      @Param('id') id: string,
      @Body() updateOptionDto: UpdateOptionDto,
   ): Promise<MessageResponse> {
      return this.createSuccessResponse(
         await this.optionService.update(id, updateOptionDto),
         'Option updated',
      );
   }

   @Get()
   public async findAll(): Promise<MessageResponse> {
      return this.createSuccessResponse(await this.optionService.findAll(), 'Options found');
   }

   @Get(':id')
   public async findOne(@Param('id') id: string): Promise<MessageResponse> {
      return this.createSuccessResponse(await this.optionService.findById(id), 'Option found');
   }
}
