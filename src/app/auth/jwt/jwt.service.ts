import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common/base';
import { IPayload, IPayloadPayment } from './IPayload.interface';

@Injectable()
export class JWTService extends BaseService {
   constructor(private jwtService: JwtService) {
      super();
   }

   public async generateToken(payloadData: Record<string, any>): Promise<{
      accessToken: string;
      refreshToken: string;
   }> {
      const accessTokenSync = this.jwtService.signAsync(payloadData, {
         expiresIn: '1d',
      });
      const refreshTokenSync = this.jwtService.signAsync(payloadData, {
         expiresIn: '30d',
      });
      const [accessToken, refreshToken] = await Promise.all([accessTokenSync, refreshTokenSync]);
      return { accessToken, refreshToken };
   }

   public verifyToken(token: string): IPayload {
      try {
         return this.jwtService.verify(token);
      } catch (error) {
         this.UnauthorizedException('Token is invalid');
      }
   }

   public verifyTokenPayment(token: string): IPayloadPayment {
      try {
         return this.jwtService.verify(token);
      } catch (error) {
         this.UnauthorizedException('Token payment is invalid');
      }
   }

   public generatePaymentToken(payloadData: Record<string, any>): string {
      return this.jwtService.sign(payloadData, {
         expiresIn: '1h',
      });
   }
}
