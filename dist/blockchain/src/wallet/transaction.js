"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
const chain_util_1 = require("../chain-util");
class Transaction {
    constructor() {
        this.id = "aaa";
        this.txOutputs = [];
    }
    static transactionsWithOutput(senderWallet, txOutputs) {
        const transaction = new this();
        transaction.txOutputs.push(...txOutputs);
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }
    static newTransaction(senderWallet, recipient, amountToSend) {
        if (amountToSend > senderWallet.balance) {
            throw new RangeError("Amount " + amountToSend + " exceeds balance.");
        }
        let txOutputs = [
            { amount: senderWallet.balance - amountToSend, address: senderWallet.publicKey },
            { amount: amountToSend, address: recipient }
        ];
        return Transaction.transactionsWithOutput(senderWallet, txOutputs);
    }
    static newRewardTransaction(minerWallet, blockchainWallet) {
        let txOutputs = [
            { amount: 9999999, address: config.BLOCKCHAIN_WALLET_ADDRESS },
            { amount: config.MINING_REWARD, address: minerWallet.publicKey }
        ];
        return Transaction.transactionsWithOutput(blockchainWallet, txOutputs);
    }
    static signTransaction(transaction, senderWallet) {
        transaction.txInput = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(chain_util_1.default.genHash(transaction.txOutputs))
        };
    }
    static verifyTransaction(transaction) {
        return chain_util_1.default.verifySignature(transaction.txInput.address, transaction.txInput.signature, chain_util_1.default.genHash(transaction.txOutputs));
    }
    update(senderWallet, recipient, amountToTx) {
        const senderTxOutput = this.txOutputs.find(txOutput => txOutput.address === senderWallet.publicKey);
        if (amountToTx > senderTxOutput.amount) {
            throw new RangeError("Amount " + amountToTx + " exceeds balance.");
        }
        senderTxOutput.amount -= amountToTx;
        this.txOutputs.push({ amount: amountToTx, address: recipient });
        Transaction.signTransaction(this, senderWallet);
        return this;
    }
}
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map