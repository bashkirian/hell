"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../src/wallet/transaction");
const wallet_1 = require("../../src/wallet");
const config = require("../../src/config");
describe("Transaction", () => {
    let transaction, senderWallet, recipient, firstTxAmount;
    beforeEach(() => {
        senderWallet = new wallet_1.default();
        firstTxAmount = 50;
        recipient = "r3c1p13nt";
        transaction = transaction_1.default.newTransaction(senderWallet, recipient, firstTxAmount);
    });
    test("outputs the amount subtracted from wallet balance", () => {
        const senderTxOutput = transaction.txOutputs.find(txOutput => txOutput.address === senderWallet.publicKey);
        expect(senderTxOutput.amount).toEqual(senderWallet.balance - firstTxAmount);
    });
    test("amount added to recipient amount", () => {
        const recipientTxOutput = transaction.txOutputs.find(txOutput => txOutput.address === recipient);
        expect(recipientTxOutput.amount).toEqual(firstTxAmount);
    });
    test("inputs the balance of the wallet", () => {
        expect(transaction.txInput.amount).toEqual(senderWallet.balance);
    });
    test("verifyTransaction - valid transaction", () => {
        expect(transaction_1.default.verifyTransaction(transaction)).toBe(true);
    });
    test("verifyTransaction - valid transaction - input balance corrupted", () => {
        transaction.txInput.amount = 10000;
        expect(transaction_1.default.verifyTransaction(transaction)).toBe(true);
    });
    test("verifyTransaction - invalid transaction - input signature corrupted", () => {
        transaction.txInput.signature = "123456abcdef";
        expect(transaction_1.default.verifyTransaction(transaction)).toBe(false);
    });
    test("verifyTransaction - invalid transaction - output corrupted", () => {
        transaction.txOutputs[0].amount = 10000;
        expect(transaction_1.default.verifyTransaction(transaction)).toBe(false);
    });
    test("transacting with amount that exceeds balance - does NOT create the transaction and throws error", () => {
        firstTxAmount = 50000;
        expect(() => {
            transaction_1.default.newTransaction(senderWallet, recipient, firstTxAmount);
        }).toThrowError('exceeds');
    });
    describe("updating transaction - successful", () => {
        let secondTxAmount, nextRecipient;
        beforeEach(() => {
            secondTxAmount = 50;
            nextRecipient = "n3xt-4ddr355";
            transaction = transaction.update(senderWallet, nextRecipient, secondTxAmount);
        });
        test("subtracts the 2nd amount from sender's output", () => {
            const senderTxOutput = transaction.txOutputs.find(output => output.address === senderWallet.publicKey);
            expect(senderTxOutput.amount).toEqual(senderWallet.balance - firstTxAmount - secondTxAmount);
        });
        test("outputs an amount for 2nd recipient", () => {
            const nextRecipientTxOutput = transaction.txOutputs.find(output => output.address === nextRecipient);
            expect(nextRecipientTxOutput.amount).toEqual(secondTxAmount);
        });
    });
    describe("updating transaction - error", () => {
        test("does NOT update transaction - sender tried to send too much on 2nd transfer", () => {
            let secondTxAmount = 5000;
            let nextRecipient = "n3xt-4ddr355";
            expect(() => {
                transaction = transaction.update(senderWallet, nextRecipient, secondTxAmount);
            }).toThrowError('exceeds');
        });
    });
    describe("creating reward transaction", () => {
        beforeEach(() => {
            transaction = transaction_1.default.newRewardTransaction(senderWallet, wallet_1.default.getBlockchainWallet());
        });
        test("reward the miner's wallet", () => {
            let txOutput = transaction.txOutputs.find(txOutput => txOutput.address === senderWallet.publicKey);
            expect(txOutput.amount).toEqual(config.MINING_REWARD);
            expect(wallet_1.default.getBlockchainWallet().publicKey).toEqual(config.BLOCKCHAIN_WALLET_ADDRESS);
        });
    });
});
//# sourceMappingURL=transaction.test.js.map