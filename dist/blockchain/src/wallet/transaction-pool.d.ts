import Transaction from "./transaction";
export default class TransactionPool {
    transactions: Transaction[];
    constructor();
    clear(): void;
    updateOrAddTransaction(transaction: Transaction): void;
    findTransaction(address: string): Transaction;
    validTransactions(): Transaction[];
}
