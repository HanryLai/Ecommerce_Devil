import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { OrderService } from '../order/order.service';
import { BaseService } from '@/common/base';
import { MoMoRequest } from './interfaces/momo-request.interface';
import { CurrentUserDto } from '@/common/interceptor';
import { JWTService } from '../auth/jwt';
@Injectable()
export class PaymentService extends BaseService {
   constructor(
      @Inject() private readonly orderService: OrderService,
      @Inject() private readonly jwtService: JWTService,
   ) {
      super();
   }

   private generateJwtTokenPayment(orderId: string) {
      return this.jwtService.generatePaymentToken({ orderId });
   }

   private MoMoRequestContent(amountMoney: number, orderId: string): MoMoRequest {
      const host = process.env.HOST || 'localhost';
      const port = process.env.PORT || '3030';
      var accessKey = 'F8BBA842ECF85';
      var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
      var orderInfo = 'pay with MoMo';
      var partnerCode = 'MOMO';
      var redirectUrl =
         `http://${host}:${port}/api/payment/successfully?orderId=` +
         this.generateJwtTokenPayment(orderId);
      var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
      var requestType = 'payWithMethod';
      var amount = amountMoney;
      var orderId = partnerCode + new Date().getTime();
      var requestId = orderId;
      var extraData = '';
      var paymentCode =
         'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
      var orderGroupId = '';
      var autoCapture = true;
      var lang = 'vi';

      var rawSignature =
         'accessKey=' +
         accessKey +
         '&amount=' +
         amount +
         '&extraData=' +
         extraData +
         '&ipnUrl=' +
         ipnUrl +
         '&orderId=' +
         orderId +
         '&orderInfo=' +
         orderInfo +
         '&partnerCode=' +
         partnerCode +
         '&redirectUrl=' +
         redirectUrl +
         '&requestId=' +
         requestId +
         '&requestType=' +
         requestType;
      //puts raw signature
      console.log('--------------------RAW SIGNATURE----------------');
      console.log(rawSignature);
      //signature
      const crypto = require('crypto');
      var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
      console.log('--------------------SIGNATURE----------------');
      console.log(signature);

      //json object send to MoMo endpoint
      const requestBody = JSON.stringify({
         partnerCode: partnerCode,
         partnerName: 'Test',
         storeId: 'MomoTestStore',
         requestId: requestId,
         amount: amount,
         orderId: orderId,
         orderInfo: orderInfo,
         redirectUrl: redirectUrl,
         ipnUrl: ipnUrl,
         lang: lang,
         requestType: requestType,
         autoCapture: autoCapture,
         extraData: extraData,
         orderGroupId: orderGroupId,
         signature: signature,
      });

      return {
         method: 'POST',
         url: 'https://test-payment.momo.vn/v2/gateway/api/create',
         headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
         },
         data: requestBody,
      };
   }

   async pay(user: CurrentUserDto, orderId: string) {
      try {
         const order = await this.orderService.getOrderById(user, orderId);
         if (!order) {
            return this.NotFoundException('Order not found');
         }

         const result = await axios(this.MoMoRequestContent(order.total_price, orderId));
         console.log('result', result.data);
         return result.data;
      } catch (error) {
         console.log('--------------------ERROR----------------');
         console.log(error);
      }
   }

   async informPayment(user: CurrentUserDto, orderIdEnCoded: string) {
      try {
         const orderId = (await this.jwtService.verifyToken(orderIdEnCoded)).orderId;
         const order = await this.orderService.getOrderById(user, orderId);
         if (!order) {
            return this.NotFoundException('Order not found');
         }
         console.log('order', order);
         const result = await this.orderService.updateOrderById(orderId, true);
         return result;
      } catch (error) {
         console.log('--------------------ERROR----------------');
         console.log(error);
      }
   }
}
