export type IPayload = {
   id: string;
   username: string;
   email: string;
   roleName: string;
} & Record<string, any>;

export type IPayloadPayment = {
   orderId: string;
};
