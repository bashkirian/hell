import Block from "./block";
export default class Blockchain {
    chain: Block[];
    constructor();
    addBlock(data: any): Block;
    isValidChain(blocks: Block[]): boolean;
    replaceChain(newBlocks: Block[]): boolean;
}
