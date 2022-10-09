export default class ChainUtil {
    static genKeyPair(): any;
    static genHash(data: any): string;
    static verifySignature(publicKey: string, signature: string, expectedDataHash: string): boolean;
}
