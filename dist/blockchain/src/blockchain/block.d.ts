export default class Block {
    timestamp: number;
    lastHash: string;
    hash: string;
    data: any;
    nonce: number;
    difficulty: number;
    constructor(timestamp: number, lastHash: string, hash: string, data: any, nonce: number, difficulty: number);
    static getGenesisBlock(): Block;
    static mineNewBlock(lastBlock: Block, data: any): Block;
    static generateHash(timestamp: number, lastHash: string, data: any, nonce: number, difficulty: number): string;
    static generateHash2(block: Block): string;
    static adjustDifficulty(lastBlock: Block, newBlockTime: number): number;
    toString(): string;
}
