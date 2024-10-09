import * as crypto from 'crypto';
export const generateRsaKey = async (): Promise<{ publicKey; privateKey }> => {
   return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
         type: 'spki',
         format: 'pem',
      },
      privateKeyEncoding: {
         type: 'pkcs8',
         format: 'pem',
      },
   });
};
