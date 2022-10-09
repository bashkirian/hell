import Blockchain from "../blockchain";
import TransactionPool from "../wallet/transaction-pool";
import Wallet from "../wallet";
import P2pServer from "./p2p-server";
import Block from "../blockchain/block";
export default class Miner {
    blockchain: Blockchain;
    tp: TransactionPool;
    wallet: Wallet;
    p2pServer: P2pServer;
    constructor(blockchain: Blockchain, tp: TransactionPool, wallet: Wallet, p2pServer: P2pServer);
    mine(): Block;
}
