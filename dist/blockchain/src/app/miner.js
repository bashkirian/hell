"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../wallet/transaction");
const wallet_1 = require("../wallet");
class Miner {
    constructor(blockchain, tp, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.tp = tp;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }
    mine() {
        const validTransactions = this.tp.validTransactions();
        validTransactions.push(transaction_1.default.newRewardTransaction(this.wallet, wallet_1.default.getBlockchainWallet()));
        let block = this.blockchain.addBlock(validTransactions);
        this.p2pServer.syncChains();
        this.tp.clear();
        this.p2pServer.broadcastClearTxs();
        return block;
    }
}
exports.default = Miner;
//# sourceMappingURL=miner.js.map