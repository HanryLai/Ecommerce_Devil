import {
   Body,
   Controller,
   Get,
   HttpCode,
   Param,
   Post,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponse } from 'src/common/base';
import { BaseController } from 'src/common/base/baseController.base';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { AuthGuard } from 'src/common/guard';
import { CurrentUserInterceptor } from 'src/common/interceptor/currentUser.interceptor';
import { CurrentUserDto } from 'src/common/interceptor/dto/user-dto.interceptor';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController extends BaseController {
   constructor(private readonly authService: AuthService) {
      super();
   }

   @Post('register')
   @ApiOperation({ description: 'Register new account for user' })
   @ApiResponse({ status: '2XX', description: 'Register successfully' })
   @ApiResponse({ status: '5XX', description: 'Register failed' })
   @HttpCode(201)
   public async register(@Body() dataRegister: CreateAuthDto): Promise<MessageResponse> {
      const account = await this.authService.register(dataRegister);
      return this.createSuccessResponse(account);
   }

   @Post('login')
   @ApiOperation({ description: 'Feature login' })
   @ApiResponse({ status: '2XX', description: 'Login successfully' })
   @ApiResponse({ status: '5XX', description: 'Login failed' })
   @ApiBearerAuth()
   @HttpCode(200)
   public async login(@Body() loginDto: LoginDto): Promise<MessageResponse> {
      return this.OkResponse(await this.authService.login(loginDto));
   }

   @Post('logout')
   @ApiOperation({ description: 'Feature logout' })
   @ApiResponse({ status: '2XX', description: 'Logout successfully' })
   @ApiResponse({ status: '5XX', description: 'Logout failed' })
   @ApiBearerAuth()
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @HttpCode(200)
   public async logout(@CurrentUser() user: CurrentUserDto): Promise<MessageResponse> {
      return this.OkResponse(await this.authService.logout(user));
   }

   @Get('account/:id')
   @ApiOperation({ description: 'Feature logout' })
   @ApiResponse({ status: '2XX', description: 'Logout successfully' })
   @ApiResponse({ status: '5XX', description: 'Logout failed' })
   @ApiBearerAuth()
   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @HttpCode(200)
   async findAccountById(
      @CurrentUser() user: CurrentUserDto,
      @Param('id') id: string,
   ): Promise<MessageResponse> {
      return this.OkResponse(await this.authService.findAccountById(user, id));
   }

   @UseGuards(AuthGuard)
   @UseInterceptors(CurrentUserInterceptor)
   @Get()
   async get(@CurrentUser() user: CurrentUserDto) {
      return user;
   }
}
