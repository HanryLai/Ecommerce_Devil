export class MessageResponse implements MessageResponse {
   public readonly message: string;
   public readonly statusCode: number;
   public readonly success: boolean = true;
   public readonly data: any;
   constructor(message: string, statusCode: number, data: any = {}) {
      (this.message = message), (this.data = data), (this.statusCode = statusCode);
      return {
         message: this.message,
         statusCode: this.statusCode,
         success: this.success,
         data: this.data,
      };
   }
}
