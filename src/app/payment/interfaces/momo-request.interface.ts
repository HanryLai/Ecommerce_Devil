export interface MoMoRequest {
   method: string;
   url: string;
   headers: {
      'Content-Type': 'application/json';
      'Content-Length': number;
   };
   data: Object;
}
