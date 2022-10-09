"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./transaction");
class TransactionPool {
    constructor() {
        this.transactions = [];
    }
    clear() {
        this.transactions = [];
    }
    updateOrAddTransaction(transaction) {
        let foundTx = this.transactions.find(tx => tx.id === transaction.id);
        if (foundTx) {
            this.transactions[this.transactions.indexOf(foundTx)] = transaction;
        }
        else {
            this.transactions.push(transaction);
        }
    }
    findTransaction(address) {
        return this.transactions.find(tx => tx.txInput.address === address);
    }
    validTransactions() {
        let validTransactions = [];
        this.transactions.forEach(tx => {
            let startingBalance = tx.txInput.amount;
            let outputBalance = 0;
            tx.txOutputs.forEach(txOutput => {
                outputBalance += txOutput.amount;
            });
            if (outputBalance !== startingBalance) {
                console.log("Invalid transaction (balance) from address: " + tx.txInput.address);
                return;
            }
            if (!transaction_1.default.verifyTransaction(tx)) {
                console.log("Invalid transaction (signature) from address: " + tx.txInput.address);
                return;
            }
            validTransactions.push(tx);
        });
        return validTransactions;
    }
}
exports.default = TransactionPool;
//# sourceMappingURL=transaction-pool.js.map