import { Controller, Get, HttpCode, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base';
import { CurrentUser } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserDto, CurrentUserInterceptor } from 'src/common/interceptor';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('Room')
export class RoomController extends BaseController {
   constructor(private readonly roomService: RoomService) {
      super();
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @Get()
   @ApiOperation({ description: 'Feature find all room for admin' })
   @ApiResponse({ status: '2XX', description: 'find all room successfully' })
   @ApiResponse({ status: '5XX', description: 'find all room failed' })
   @HttpCode(200)
   async findAll(@CurrentUser() user: CurrentUserDto) {
      return this.OkResponse(
         await this.roomService.findAllByAdmin(user),
         'find all room successfully',
      );
   }
}
