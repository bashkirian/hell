"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("../../src/blockchain");
const block_1 = require("../../src/blockchain/block");
const transaction_1 = require("../../src/wallet/transaction");
describe('Blockchain', () => {
    let bc;
    let bc2;
    beforeEach(() => {
        bc = new blockchain_1.default();
        bc2 = new blockchain_1.default();
    });
    test("starts with Genesis Block", () => {
        expect(bc.chain[0]).toEqual(block_1.default.getGenesisBlock());
    });
    test("adds new block", () => {
        let data = "barData";
        let newBlock = bc.addBlock(data);
        expect(data).toEqual(bc.chain[1].data);
        expect(data).toEqual(bc.chain[bc.chain.length - 1].data);
        expect(newBlock.data).toEqual(data);
        expect(newBlock).toEqual(bc.chain[1]);
        expect(newBlock).toEqual(bc.chain[bc.chain.length - 1]);
    });
    test("validate chain - valid chain", () => {
        bc2.addBlock("foo");
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });
    test("invalidates chain - corrupt genesis data", () => {
        bc2.chain[0].data = [new transaction_1.default()];
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    test("invalidate chain - corrupt genesis hash", () => {
        bc2.chain[0].hash = "corrupt";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    test("validate chain - invalid chain - corrupt non-genesis data", () => {
        bc2.addBlock("foo");
        bc2.chain[1].data = "corrupted";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    test("validate chain - invalid chain - corrupt non-genesis hash", () => {
        bc2.addBlock("foo");
        bc2.chain[1].hash = "corrupt";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    test("replace blockchain with valid chain", () => {
        bc2.addBlock("new block");
        expect(bc.replaceChain(bc2.chain)).toBe(true);
        expect(bc.chain).toEqual(bc2.chain);
    });
    test("does NOT replace blockchain - new chain is too short", () => {
        bc.addBlock("new block");
        expect(bc.replaceChain(bc2.chain)).toBe(false);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
    test("replace blockchain - invalid - corrupt data", () => {
        bc2.addBlock("new block");
        bc2.chain[1].data = [new transaction_1.default()];
        expect(bc.replaceChain(bc2.chain)).toBe(false);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});
//# sourceMappingURL=index.test.js.map