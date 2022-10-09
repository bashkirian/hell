"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_util_1 = require("../chain-util");
const config = require("../config");
const transaction_1 = require("../wallet/transaction");
const transaction_input_1 = require("../wallet/transaction-input");
class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static getGenesisBlock() {
        let genesisTx = new transaction_1.default();
        genesisTx.id = "genesis";
        genesisTx.txInput = new transaction_input_1.default(0, "-----");
        return new Block(0, '-----', 'f1r5t-ha4h', genesisTx, 0, config.DIFFICULTY);
    }
    static mineNewBlock(lastBlock, data) {
        let timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        let hash;
        let { difficulty } = lastBlock;
        do {
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            nonce++;
            hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substr(0, difficulty) !== "0".repeat(difficulty));
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }
    static generateHash(timestamp, lastHash, data, nonce, difficulty) {
        return chain_util_1.default.genHash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`);
    }
    static generateHash2(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
    }
    static adjustDifficulty(lastBlock, newBlockTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + config.MINE_RATE > newBlockTime ? ++difficulty : --difficulty;
        if (difficulty < 1)
            difficulty = 1;
        return difficulty;
    }
    toString() {
        return `Block:
			Timestamp  : ${this.timestamp}
			Last Hash  : ${this.lastHash.substring(0, 10)}
			Hash       : ${this.hash.substring(0, 10)}
			Data       : ${this.data}
			Nonce      : ${this.nonce}
			Difficulty : ${this.difficulty}
		`;
    }
}
exports.default = Block;
//# sourceMappingURL=block.js.map