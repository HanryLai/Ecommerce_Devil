import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { BaseController } from 'src/common/base/controller.base';
import { AuthGuard } from 'src/common/guard/authorizationRequest.guard';

@Controller('auth')
export class AuthController extends BaseController {
   constructor(private readonly authService: AuthService) {
      super();
   }

   @Post('register')
   @ApiOperation({
      description: 'Register new account for user',
   })
   @ApiResponse({ status: '2XX', description: 'Register successfully' })
   @ApiResponse({ status: '5XX', description: 'Register failed' })
   public async register(@Body() dataRegister: CreateAuthDto) {
      const account = await this.authService.register(dataRegister);
      return this.createSuccessResponse(account, 201);
   }

   @Post('login')
   @ApiResponse({ status: '2XX', description: 'Login successfully' })
   @ApiResponse({ status: '5XX', description: 'Login failed' })
   @ApiBearerAuth()
   public async login(@Body() loginDto: CreateAuthDto) {
      return this.createSuccessResponse(await this.authService.login(loginDto), 201);
   }
   @Get()
   async get() {
      console.log('testt');
   }
   // @Get('test')
   // public async test(@Body() dataRegister: CreateAuthDto) {
   //    const account = await this.authService.findAccountByField(dataRegister);
   //    return this.createSuccessResponse(account);
   // }
}
