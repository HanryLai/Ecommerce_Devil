import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { generateRsaKey } from './RSA.jwt';

@Module({
   imports: [
      JwtModule.registerAsync({
         useFactory: async () => {
            const { publicKey, privateKey } = await generateRsaKey();
            return {
               publicKey: publicKey,
               privateKey: privateKey,
               signOptions: {
                  algorithm: 'RS256',
                  expiresIn: '1h',
               },
               verifyOptions: {
                  algorithms: ['RS256'],
               },
            };
         },
      }),
   ],
   controllers: [],
   providers: [JWTService],
   exports: [JWTService],
})
export class JWTModule {}
