import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/entities/auth';

@Injectable()
export class EmailService {
   constructor(private readonly mailerService: MailerService) {}
   async sendUserConfirmation(account: AccountEntity) {
      await this.mailerService.sendMail({
         to: 'ldmhieudev@gmail.com',
         from: '"Support Team" <support@gmail.com>',
         subject: 'Welcome to Nice App! Confirm your Email',
         template: 'welcom-email',
         context: {
            email: account.email,
            url: process.env.URL + '/api',
         },
      });
   }
}
