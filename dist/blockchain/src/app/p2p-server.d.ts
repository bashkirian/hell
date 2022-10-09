import * as WebSocket from "ws";
import Blockchain from "../blockchain";
import Transaction from "../wallet/transaction";
import TransactionPool from "../wallet/transaction-pool";
export default class P2pServer {
    blockchain: Blockchain;
    tp: TransactionPool;
    webSockets: WebSocket[];
    readonly server: WebSocket.Server;
    constructor(blockchain: Blockchain, tp: TransactionPool);
    listen(): void;
    connectToPeers(): void;
    connectSocket(webSocket: WebSocket): void;
    messageHandler(socket: WebSocket): void;
    sendChain(webSocket: WebSocket): void;
    sendTransaction(webSocket: WebSocket, transaction: Transaction): void;
    syncChains(): void;
    broadcastTx(transaction: Transaction): void;
    broadcastClearTxs(): void;
}
