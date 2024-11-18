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
   HttpCode,
} from '@nestjs/common';
import { DetailInformationService } from './detail-information.service';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseController } from 'src/common/base';
import { CurrentUser } from 'src/common/decorators';

@UseGuards(AuthGuard)
@UseInterceptors(CurrentUserInterceptor)
@Controller('detail-information')
export class DetailInformationController extends BaseController {
   constructor(private readonly detailInformationService: DetailInformationService) {
      super();
   }

   @Get('/my')
   @ApiOperation({ description: 'Feature find my detail information' })
   @ApiResponse({ status: '2XX', description: 'Find successfully' })
   @ApiResponse({ status: '5XX', description: 'Find failed' })
   @HttpCode(200)
   async findOne(@CurrentUser() user: CurrentUserDto) {
      return this.OkResponse(await this.detailInformationService.findOne(user));
   }

   @Patch('update')
   @ApiOperation({ description: 'Feature update my detail information' })
   @ApiResponse({ status: '2XX', description: 'Update successfully' })
   @ApiResponse({ status: '5XX', description: 'Update failed' })
   @HttpCode(200)
   async update(
      @CurrentUser() user: CurrentUserDto,
      @Body() updateDetailInformationDto: UpdateDetailInformationDto,
   ) {
      return this.OkResponse(
         await this.detailInformationService.update(user, updateDetailInformationDto),
      );
   }
}
