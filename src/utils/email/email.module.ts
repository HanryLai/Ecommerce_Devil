import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import * as path from 'path';

@Global()
@Module({
   imports: [
      MailerModule.forRootAsync({
         useFactory: () => ({
            transport: {
               host: 'smtp.gmail.com',
               port: 587,
               secure: false,
               auth: {
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD,
               },
            },
            defaults: {
               from: '"No Reply" <noreply@example.com>',
            },
            template: {
               dir: path.join('./src/', 'templates'),
               adapter: new EjsAdapter(),
               options: {
                  strict: true,
               },
            },
         }),
      }),
   ],
   providers: [EmailService],
   exports: [EmailService],
})
export class EmailModule {}
