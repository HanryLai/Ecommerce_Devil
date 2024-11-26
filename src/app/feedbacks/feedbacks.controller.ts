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
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { BaseController, MessageResponse } from 'src/common/base';
import { AuthGuard } from 'src/common/guard';
import { log } from 'console';

@Controller('feedbacks')
export class FeedbacksController extends BaseController {
   constructor(private readonly feedbacksService: FeedbacksService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @ApiBearerAuth()
   @Post()
   public async addFavorite(
      @CurrentUser() user: CurrentUserDto,
      @Body() createFeedbackDto: CreateFeedbackDto,
   ): Promise<MessageResponse> {
      console.log(user);
      console.log('asd');
      return this.OkResponse(await this.feedbacksService.addFavorite(user, createFeedbackDto));
   }

   @Get(':productId')
   public async GetFeedbackByProductId(
      @Param('productId') productId: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.feedbacksService.findByProduct(productId));
   }

   @UseGuards(AuthGuard)
   @Put(':id')
   public async updateFeedback(
      @Param('id') id: string,
      @Body() updateFeedbackDto: UpdateFeedbackDto,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.feedbacksService.updateFeedback(id, updateFeedbackDto));
   }
}
