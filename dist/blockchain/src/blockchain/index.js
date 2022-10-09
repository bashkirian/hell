"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./block");
class Blockchain {
    constructor() {
        this.chain = [block_1.default.getGenesisBlock()];
    }
    addBlock(data) {
        const newBlock = block_1.default.mineNewBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(newBlock);
        return newBlock;
    }
    isValidChain(blocks) {
        if (JSON.stringify(blocks[0]) !== JSON.stringify(block_1.default.getGenesisBlock())) {
            return false;
        }
        for (let i = 1; i < blocks.length; i++) {
            const currentBlock = blocks[i];
            const previousBlock = blocks[i - 1];
            if (currentBlock.lastHash !== previousBlock.hash ||
                currentBlock.hash !== block_1.default.generateHash2(currentBlock)) {
                return false;
            }
        }
        return true;
    }
    replaceChain(newBlocks) {
        if (newBlocks.length <= this.chain.length) {
            console.log("New chain is not longer than current chain - NOT replacing.");
            return false;
        }
        if (!this.isValidChain(newBlocks)) {
            console.log("New chain is not valid - NOT replacing.");
            return false;
        }
        this.chain = newBlocks;
        console.log("Replacing current chain with new chain.");
        return true;
    }
}
exports.default = Blockchain;
//# sourceMappingURL=index.js.map