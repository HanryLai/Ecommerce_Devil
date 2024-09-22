import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as process from 'node:process';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
   private logger = new Logger('HTTP');

   use(req: Request, res: Response, next: NextFunction): void {
      const { ip, method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';
      const start = process.hrtime();

      res.on('finish', () => {
         const { statusCode } = res;
         const contentLength = res.get('content-length');
         const responseTime = process.hrtime(start);
         const elapsedTimeInMilliseconds = responseTime[0] * 1000 + responseTime[1] / 1e6;

         this.logger.log(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${elapsedTimeInMilliseconds.toFixed(2)} ms`,
         );
      });
      res.on('error', (err) => {
         this.logger.error(`Error: ${err} ${method} ${originalUrl} ${userAgent} ${ip}`);
      });
      next();
   }
}
