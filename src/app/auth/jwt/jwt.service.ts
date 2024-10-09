import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common/base';
import { IPayload } from './IPayload.interface';

@Injectable()
export class JWTService extends BaseService {
   constructor(private jwtService: JwtService) {
      super();
   }

   public async generateToken(payloadData: Record<string, any>): Promise<{
      accessToken: string;
      refreshToken: string;
   }> {
      const accessTokenSync = this.jwtService.sign(payloadData, {
         expiresIn: '1d',
      });
      const refreshTokenSync = this.jwtService.sign(payloadData, {
         expiresIn: '30d',
      });
      const [accessToken, refreshToken] = await Promise.all([accessTokenSync, refreshTokenSync]);
      return { accessToken, refreshToken };
   }

   public async verifyToken(token: string): Promise<IPayload> {
      try {
         return await this.jwtService.verify(token);
      } catch (error) {
         this.UnauthorizedException('Token is invalid');
      }
   }
}
