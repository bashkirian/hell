import TransactionPool from "./transaction-pool";
import Transaction from "./transaction";
import Blockchain from "../blockchain";
export default class Wallet {
    balance: number;
    keypair: any;
    publicKey: any;
    static bcWallet: Wallet;
    lastBlockTimestamp: number;
    lastBlockBalanceCalc: number;
    constructor();
    static getBlockchainWallet(): Wallet;
    calculateBalance(blockchain: Blockchain): number;
    createOrUpdateTransaction(recipient: string, sendAmount: number, blockchain: Blockchain, tp: TransactionPool): Transaction;
    sign(dataHash: string): string;
    toString(): string;
}
