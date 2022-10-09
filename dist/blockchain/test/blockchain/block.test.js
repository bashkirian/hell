"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../../src/blockchain/block");
describe('Block', () => {
    let data, previousBlock, block;
    beforeEach(() => {
        data = 'test1';
        previousBlock = block_1.default.getGenesisBlock();
        block = block_1.default.mineNewBlock(previousBlock, data);
    });
    test('sets data to match input', () => {
        expect(block.data).toEqual(data);
    });
    test('sets last hash to match hash of last block', () => {
        expect(block.lastHash).toEqual(previousBlock.hash);
    });
    test('generates a hash that matches difficulty level', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });
    test("adjustDifficulty() - lowers difficulty for slowly mined blocks", () => {
        expect(block_1.default.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1);
    });
    test("adjustDifficulty() - raises difficulty for quickly mined blocks", () => {
        expect(block_1.default.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);
    });
    test("adjustDifficulty() - doesn't lower difficulty below 1", () => {
        let calculatedDifficulty = 100;
        let lowestDifficultyReached = false;
        for (let i = 0; i < 3; i++) {
            calculatedDifficulty = block_1.default.adjustDifficulty(block, block.timestamp + 360000);
            block.difficulty = calculatedDifficulty;
            if (calculatedDifficulty === 1) {
                lowestDifficultyReached = true;
                calculatedDifficulty = block_1.default.adjustDifficulty(block, block.timestamp + 360000);
                expect(calculatedDifficulty).toEqual(1);
            }
        }
        expect(lowestDifficultyReached).toBe(true);
        expect(calculatedDifficulty).toEqual(1);
    });
});
//# sourceMappingURL=block.test.js.map