"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../config");
const chain_util_1 = require("../chain-util");
const transaction_1 = require("./transaction");
class Wallet {
    constructor() {
        this.balance = config.INITIAL_BALANCE;
        this.keypair = chain_util_1.default.genKeyPair();
        this.publicKey = this.keypair.getPublic().encode("hex");
        this.lastBlockTimestamp = 0;
        this.lastBlockBalanceCalc = 0;
    }
    static getBlockchainWallet() {
        if (!Wallet.bcWallet) {
            Wallet.bcWallet = new this();
            Wallet.bcWallet.publicKey = config.BLOCKCHAIN_WALLET_ADDRESS;
        }
        return Wallet.bcWallet;
    }
    calculateBalance(blockchain) {
        this.lastBlockTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
        let balance = this.balance;
        const newTransactions = [];
        if (this.lastBlockBalanceCalc === this.lastBlockTimestamp &&
            this.lastBlockBalanceCalc > 0) {
            return balance;
        }
        let startBlockIndex = 0;
        let blocks = blockchain.chain;
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].timestamp === this.lastBlockBalanceCalc) {
                startBlockIndex = i + 1;
                break;
            }
        }
        for (let i = startBlockIndex; i < blocks.length; i++) {
            let blockTransactions = blocks[i].data;
            for (let j = 0; j < blockTransactions.length; j++) {
                newTransactions.push(blockTransactions[j]);
            }
        }
        const thisWalletWithdrawalTxs = newTransactions.filter(transaction => transaction.txInput.address === this.publicKey);
        const thisWalletDepositTxs = newTransactions.filter(transaction => {
            for (let i = 1; i < transaction.txOutputs.length; i++) {
                if (transaction.txOutputs[i].address === this.publicKey &&
                    transaction.txInput.address !== this.publicKey)
                    return true;
            }
            return false;
        });
        for (let i = 0; i < thisWalletWithdrawalTxs.length; i++) {
            for (let j = 1; j < thisWalletWithdrawalTxs[i].txOutputs.length; j++) {
                balance -= thisWalletWithdrawalTxs[i].txOutputs[j].amount;
            }
        }
        for (let i = 0; i < thisWalletDepositTxs.length; i++) {
            for (let j = 1; j < thisWalletDepositTxs[i].txOutputs.length; j++) {
                if (thisWalletDepositTxs[i].txOutputs[j].address === this.publicKey) {
                    balance += thisWalletDepositTxs[i].txOutputs[j].amount;
                }
            }
        }
        this.lastBlockBalanceCalc = this.lastBlockTimestamp;
        this.balance = balance;
        return balance;
    }
    createOrUpdateTransaction(recipient, sendAmount, blockchain, tp) {
        this.balance = this.calculateBalance(blockchain);
        if (sendAmount > this.balance) {
            throw new RangeError("Amount " + sendAmount + " exceeds current balance: " + this.balance);
        }
        let foundTx = tp.findTransaction(this.publicKey);
        if (foundTx) {
            foundTx.update(this, recipient, sendAmount);
        }
        else {
            foundTx = transaction_1.default.newTransaction(this, recipient, sendAmount);
            tp.updateOrAddTransaction(foundTx);
        }
        return foundTx;
    }
    sign(dataHash) {
        return this.keypair.sign(dataHash);
    }
    toString() {
        return `Wallet -
            publicKey: ${this.publicKey.toString()}
            balance  : ${this.balance}
        `;
    }
}
exports.default = Wallet;
//# sourceMappingURL=index.js.map