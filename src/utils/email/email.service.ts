import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/entities/auth';

@Injectable()
export class EmailService {
   constructor(private readonly mailerService: MailerService) {}
   async sendUserConfirmation(account: AccountEntity, token: string) {
      const url = `example.com/auth/confirm?token=${token}`;

      await this.mailerService.sendMail({
         to: 'ldmhieudev@gmail.com',
         from: '"Support Team" <support@gmail.com>', // override default from
         subject: 'Welcome to Nice App! Confirm your Email',
         template: 'otp',
         context: {
            customerName: 'hieu',
            otp: '123123',
            url,
         },
      });
   }
}
