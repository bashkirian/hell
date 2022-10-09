import Wallet from ".";
import TransactionInput from "./transaction-input";
import TransactionOutput from "./transaction-output";
export default class Transaction {
    id: string;
    txInput: TransactionInput;
    txOutputs: TransactionOutput[];
    constructor();
    static transactionsWithOutput(senderWallet: Wallet, txOutputs: TransactionOutput[]): Transaction;
    static newTransaction(senderWallet: Wallet, recipient: string, amountToSend: number): Transaction;
    static newRewardTransaction(minerWallet: Wallet, blockchainWallet: Wallet): Transaction;
    static signTransaction(transaction: Transaction, senderWallet: Wallet): void;
    static verifyTransaction(transaction: Transaction): boolean;
    update(senderWallet: Wallet, recipient: string, amountToTx: number): Transaction;
}
