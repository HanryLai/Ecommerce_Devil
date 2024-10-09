export type IPayload = {
   id: string;
   username: string;
   email: string;
   roleName: string;
} & Record<string, any>;
