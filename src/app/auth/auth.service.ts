import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from 'src/repositories/auth';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AccountEntity } from 'src/entities/auth/account.entity';
@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(AccountEntity) private accountRepository: AccountRepository,
      private jwtService: JwtService,
   ) {}

   public async generateRsaKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
      return new Promise((resolve, reject) => {
         crypto.generateKeyPair(
            'rsa',
            {
               modulusLength: 4096,
               publicKeyEncoding: {
                  type: 'pkcs1',
                  format: 'pem',
               },
               privateKeyEncoding: {
                  type: 'pkcs1',
                  format: 'pem',
               },
            },
            (err, publicKey, privateKey) => {
               if (err) reject(err);
               else {
                  resolve({
                     publicKey: publicKey,
                     privateKey: privateKey,
                  });
               }
            },
         );
      });
   }

   public createTokenPair(payload: any, privateKey: string) {
      try {
         const accessToken = this.jwtService.sign(payload, {
            privateKey: privateKey,
            expiresIn: '30d',
            algorithm: 'RS256',
         });

         const refreshToken = this.jwtService.sign(payload, {
            secret: privateKey,
            expiresIn: '30d',
            algorithm: 'RS256',
         });
         return { accessToken, refreshToken };
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   public async verifyToken(accessToken: string) {
      const payload = await this.jwtService.decode(accessToken);
      return payload;
   }

   public async register(data: CreateAuthDto) {
      // const rsaKey = await this.generateRsaKeyPair();
      // const token = this.createTokenPair({ hi: 123 }, rsaKey.privateKey);
      // const decode = await this.login(token.accessToken);
      // return { rsaKey, token, decode };
      const password = data.password as string;
      const saltRounds = bcrypt.genSaltSync(10);

      console.log(saltRounds, typeof password);

      const passwordHashed = bcrypt.hashSync(password, saltRounds);
      const accountModel = this.accountRepository.create({ ...data, password: passwordHashed });
      const saveResult = this.accountRepository.save(accountModel);

      return saveResult;
   }

   public async login(accessToken: string) {
      try {
         const decode = await this.verifyToken(accessToken);
         console.log(decode);
         return decode;
      } catch (error) {}
   }
}
