"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const P2P_PORT = process.env.P2P_PORT || "5001";
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const MESSAGE_TYPES = {
    chain: "CHAIN",
    transaction: "TRANSACTION",
    clear_transactions: "CLEAR_TRANSACTIONS"
};
class P2pServer {
    constructor(blockchain, tp) {
        this.webSockets = [];
        this.blockchain = blockchain;
        this.tp = tp;
        this.server = new WebSocket.Server({
            port: +P2P_PORT
        });
    }
    listen() {
        this.server.on("connection", webSocket => this.connectSocket(webSocket));
        this.connectToPeers();
        console.log("listening for P2P connections on " + P2P_PORT);
    }
    connectToPeers() {
        peers.forEach(peerURL => {
            const webSocket = new WebSocket(peerURL);
            webSocket.on("open", () => {
                this.connectSocket(webSocket);
            });
        });
    }
    connectSocket(webSocket) {
        this.webSockets.push(webSocket);
        console.log("socket connected");
        this.messageHandler(webSocket);
        this.sendChain(webSocket);
    }
    messageHandler(socket) {
        socket.on("message", message => {
            const messageData = JSON.parse(message.toString());
            switch (messageData.type) {
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(messageData.chain);
                    break;
                case MESSAGE_TYPES.transaction:
                    this.tp.updateOrAddTransaction(messageData.transaction);
                    break;
                case MESSAGE_TYPES.clear_transactions:
                    this.tp.clear();
                    break;
                default:
                    throw new Error("Undefined message type: " + messageData.type);
            }
        });
    }
    sendChain(webSocket) {
        webSocket.send(JSON.stringify({
            type: MESSAGE_TYPES.chain,
            chain: this.blockchain.chain
        }));
    }
    sendTransaction(webSocket, transaction) {
        webSocket.send(JSON.stringify({
            type: MESSAGE_TYPES.transaction,
            transaction
        }));
    }
    syncChains() {
        this.webSockets.forEach(webSocket => {
            this.sendChain(webSocket);
        });
    }
    broadcastTx(transaction) {
        this.webSockets.forEach(webSocket => {
            this.sendTransaction(webSocket, transaction);
        });
    }
    broadcastClearTxs() {
        this.webSockets.forEach(webSocket => {
            webSocket.send(JSON.stringify({
                type: MESSAGE_TYPES.clear_transactions
            }));
        });
    }
}
exports.default = P2pServer;
//# sourceMappingURL=p2p-server.js.map