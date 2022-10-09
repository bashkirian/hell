"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_pool_1 = require("../../src/wallet/transaction-pool");
const wallet_1 = require("../../src/wallet");
const blockchain_1 = require("../../src/blockchain");
describe("TransactionPool", () => {
    let tp, wallet, transaction, blockchain;
    const RECIPIENT_ADDRESS = "r4nd-4ddr355";
    beforeEach(() => {
        tp = new transaction_pool_1.default();
        wallet = new wallet_1.default();
        blockchain = new blockchain_1.default();
        transaction = wallet.createOrUpdateTransaction(RECIPIENT_ADDRESS, 30, blockchain, tp);
    });
    test("adds transaction to the pool - transaction doesn't exist in pool", () => {
        const foundTransaction = tp.transactions.find(tx => tx.id === transaction.id);
        expect(foundTransaction).toEqual(transaction);
    });
    test("updates transaction in the pool - transaction exists in pool", () => {
        const oldTxString = JSON.stringify(transaction);
        const updatedTx = transaction.update(wallet, "foo-bar", 100);
        const updatedTxString = JSON.stringify(updatedTx);
        tp.updateOrAddTransaction(transaction);
        expect(oldTxString).not.toEqual(updatedTxString);
        const foundTx = tp.transactions.find(tx => tx.id === updatedTx.id);
        const foundTxString = JSON.stringify(foundTx);
        expect(oldTxString).not.toEqual(foundTxString);
        expect(updatedTxString).toEqual(foundTxString);
    });
    test("clears transactions", () => {
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });
    describe("mixing valid and corrupt transactoins - check that only valid transactions are mined", () => {
        let validTransactions;
        beforeEach(() => {
            validTransactions = [...tp.transactions];
            for (let i = 0; i < 10; i++) {
                wallet = new wallet_1.default();
                transaction = wallet.createOrUpdateTransaction(RECIPIENT_ADDRESS, 50, blockchain, tp);
                if (i % 2 == 0) {
                    transaction.txInput.amount = 5000;
                }
                else if (i % 3 == 0) {
                    transaction.txInput.signature = '1234567890abcdef';
                }
                else {
                    validTransactions.push(transaction);
                }
            }
        });
        test("all transactions in pool (valid, invalid) are NOT equal to just valid transactions", () => {
            expect(tp.transactions).not.toEqual(validTransactions);
        });
        test("valid transactions found", () => {
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });
});
//# sourceMappingURL=transaction-pool.test.js.map