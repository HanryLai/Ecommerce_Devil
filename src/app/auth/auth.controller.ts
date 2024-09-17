import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RoleService } from '../role/role.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('register')
   @ApiOperation({
      description: 'register new account for user',
   })
   @ApiResponse({ status: '2XX', description: 'register successfully' })
   @ApiResponse({ status: '5XX', description: 'register failed' })
   public async register(@Body() dataRegister: CreateAuthDto) {
      return await this.authService.register(dataRegister);
   }
}
