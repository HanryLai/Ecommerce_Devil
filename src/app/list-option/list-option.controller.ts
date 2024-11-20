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
import { ListOptionService } from './list-option.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor';

@ApiTags('ListOption')
@Controller('list-option')
export class ListOptionController extends BaseController {
   constructor(private readonly listOptionService: ListOptionService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post()
   async create(@Body() createListOptionDto: any) {
      return this.createSuccessResponse(
         await this.listOptionService.create(createListOptionDto),
         'Create list option successfully',
      );
   }

   @Get()
   async findAll() {
      return this.createSuccessResponse(
         this.listOptionService.findAll(),
         'Find all list option successfully',
      );
   }

   @Get('option/:optionId')
   async findListOptionOfOption(@Param('optionId') optionId: string) {
      return this.createSuccessResponse(
         await this.listOptionService.findListOptionOfOption(optionId),
         'Find list option of option successfully',
      );
   }
}
