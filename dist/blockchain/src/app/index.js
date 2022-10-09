"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config");
const blockchain_1 = require("../blockchain");
const p2p_server_1 = require("./p2p-server");
const wallet_1 = require("../wallet");
const transaction_pool_1 = require("../wallet/transaction-pool");
const miner_1 = require("./miner");
const HTTP_PORT = process.env.HTTP_PORT || "3001";
const app = express();
const blockchain = new blockchain_1.default();
const wallet = new wallet_1.default();
const tp = new transaction_pool_1.default();
const p2pServer = new p2p_server_1.default(blockchain, tp);
const miner = new miner_1.default(blockchain, tp, wallet, p2pServer);
app.use(bodyParser.json());
app.get(config.ENDPOINT_GET_BALANCE, (request, response) => {
    response.json({ balance: wallet.calculateBalance(blockchain) });
});
app.get(config.ENDPOINT_GET_BLOCKS, (request, response) => {
    response.json({ blockchain: blockchain.chain });
});
app.get(config.ENDPOINT_GET_PUBLIC_KEY, (request, response) => {
    response.json({ publicKey: wallet.publicKey });
});
app.get(config.ENDPOINT_GET_TRANSACTIONS, (request, response) => {
    response.json({ transactions: tp.transactions });
});
app.post(config.ENDPOINT_POST_TRANSACTIONS, (request, response) => {
    let recipient = request.body.recipient;
    let amount = request.body.amount;
    let transaction = wallet.createOrUpdateTransaction(recipient, amount, blockchain, tp);
    p2pServer.broadcastTx(transaction);
    response.redirect(config.ENDPOINT_GET_TRANSACTIONS);
});
app.get(config.ENDPOINT_GET_MINE_TRANSACTIONS, (request, response) => {
    const block = miner.mine();
    console.log("New block added: " + block.toString());
    response.redirect(config.ENDPOINT_GET_BLOCKS);
});
app.post(config.ENDPOINT_POST_MINE, (request, response) => {
    const block = blockchain.addBlock(request.body.data);
    console.log("New block added: " + block.toString());
    p2pServer.syncChains();
    response.redirect(config.ENDPOINT_GET_BLOCKS);
});
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});
p2pServer.listen();
//# sourceMappingURL=index.js.map