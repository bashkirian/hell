"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("../../src/wallet");
const transaction_pool_1 = require("../../src/wallet/transaction-pool");
const blockchain_1 = require("../../src/blockchain");
const config_1 = require("../../src/config");
describe("Wallet", () => {
    let tp, wallet1, blockchain;
    let transaction, sendAmount, recipient;
    beforeEach(() => {
        wallet1 = new wallet_1.default();
        tp = new transaction_pool_1.default();
        blockchain = new blockchain_1.default();
        sendAmount = 50;
        recipient = "random-address";
        transaction = wallet1.createOrUpdateTransaction(recipient, sendAmount, blockchain, tp);
    });
    test("transaction exceeds balance (single transaction) and throws error", () => {
        expect(() => {
            wallet1.createOrUpdateTransaction(recipient, 1000, blockchain, tp);
        }).toThrowError('exceeds');
    });
    test("exceeds balance with multiple small transactions and throws error", () => {
        wallet1.createOrUpdateTransaction("foo", 200, blockchain, tp);
        wallet1.createOrUpdateTransaction("bar", 200, blockchain, tp);
        expect(() => {
            wallet1.createOrUpdateTransaction("baz", 51, blockchain, tp);
        }).toThrowError('exceeds');
    });
    describe("create 2nd identical transaction", () => {
        beforeEach(() => {
            wallet1.createOrUpdateTransaction(recipient, sendAmount, blockchain, tp);
        });
        test("double the `sendAmount` subtracted from the wallet balance", () => {
            let foundTxOutput = transaction.txOutputs.find(txOutput => txOutput.address === wallet1.publicKey);
            const expectedWalletBalance = wallet1.balance - sendAmount * 2;
            expect(foundTxOutput.amount).toEqual(expectedWalletBalance);
        });
        test("clones the `sendAmount` output for the recipient", () => {
            let foundTxOutputs = transaction.txOutputs.filter(txOutput => txOutput.address === recipient);
            expect(foundTxOutputs.length).toBe(2);
            expect(foundTxOutputs[0].amount).toBe(sendAmount);
            expect(foundTxOutputs[1].amount).toBe(sendAmount);
        });
    });
    describe("calculating balance", () => {
        let transfer1, repeadAdd, wallet2;
        beforeEach(() => {
            tp.clear();
            wallet2 = new wallet_1.default();
            transfer1 = 10;
            repeadAdd = 3;
            for (let i = 0; i < repeadAdd; i++) {
                wallet2.createOrUpdateTransaction(wallet1.publicKey, transfer1, blockchain, tp);
            }
            blockchain.addBlock(tp.transactions);
        });
        test("calculates balance for blockchain transactions matching the recipient", () => {
            const expectedBalance = config_1.INITIAL_BALANCE + (transfer1 * repeadAdd);
            expect(wallet1.calculateBalance(blockchain)).toEqual(expectedBalance);
        });
        test("calculates balance for blockchain transactions matching the sender", () => {
            const expectedBalance = config_1.INITIAL_BALANCE - (transfer1 * repeadAdd);
            expect(wallet2.calculateBalance(blockchain)).toEqual(expectedBalance);
        });
        describe("and recipient conducts transaction - should calculate balance only since last transaction", () => {
            let transfer2, transfer3, transfer4, transfer5, startingBalance;
            beforeEach(() => {
                tp.clear();
                transfer2 = 60;
                transfer3 = 101;
                transfer4 = 57;
                transfer5 = 10;
                startingBalance = wallet1.calculateBalance(blockchain);
            });
            test("calculates recipient balance since most recent receipt transactions", () => {
                wallet1.createOrUpdateTransaction(wallet2.publicKey, transfer2, blockchain, tp);
                blockchain.addBlock(tp.transactions);
                tp.clear();
                wallet2.createOrUpdateTransaction(wallet1.publicKey, transfer1, blockchain, tp);
                blockchain.addBlock(tp.transactions);
                const expectedBalance = startingBalance - transfer2 + transfer1;
                expect(wallet1.calculateBalance(blockchain)).toEqual(expectedBalance);
            });
            describe("transfer back and forth between 2 wallets", () => {
                function mineMock() {
                    blockchain.addBlock(tp.transactions);
                    tp.clear();
                }
                let wallet3, wallet4, wallet5;
                beforeEach(() => {
                    wallet3 = new wallet_1.default();
                    wallet4 = new wallet_1.default();
                    wallet5 = new wallet_1.default();
                    tp.clear();
                });
                test("transfer back and forth between 3 wallets - mine after EACH transfer", () => {
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet4.publicKey, transfer1, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer1);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer1);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer1);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer1);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet4.createOrUpdateTransaction(wallet3.publicKey, transfer1, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet4.publicKey, transfer2, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer2);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer2);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer2);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer2);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet5.publicKey, transfer3, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer2);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer3);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer2);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE + transfer3);
                    wallet5.createOrUpdateTransaction(wallet4.publicKey, transfer4, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4);
                    wallet5.createOrUpdateTransaction(wallet3.publicKey, transfer5, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3 + transfer5);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4 - transfer5);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3 + transfer5);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4 - transfer5);
                });
                test("transfer back and forth between 3 wallets - mine after ALL transfers", () => {
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet4.publicKey, transfer1, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet4.createOrUpdateTransaction(wallet3.publicKey, transfer1, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet4.publicKey, transfer2, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet5.publicKey, transfer3, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet5.createOrUpdateTransaction(wallet4.publicKey, transfer4, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet5.createOrUpdateTransaction(wallet3.publicKey, transfer5, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3 + transfer5);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4 - transfer5);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE - transfer2 - transfer3 + transfer5);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE + transfer2 + transfer4);
                    expect(wallet5.balance).toBe(config_1.INITIAL_BALANCE + transfer3 - transfer4 - transfer5);
                });
                test("transfer back and forth between 2 wallets - mine after both transfers", () => {
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet3.createOrUpdateTransaction(wallet4.publicKey, transfer1, blockchain, tp);
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                    wallet4.createOrUpdateTransaction(wallet3.publicKey, transfer1, blockchain, tp);
                    mineMock();
                    expect(wallet3.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.calculateBalance(blockchain)).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet3.balance).toBe(config_1.INITIAL_BALANCE);
                    expect(wallet4.balance).toBe(config_1.INITIAL_BALANCE);
                });
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map