"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const note_entity_1 = require("./entities/note.entity");
const index_1 = require("../../blockchain/src/wallet/index");
const chain_util_1 = require("../../blockchain/src/chain-util");
let WalletService = class WalletService {
    constructor() {
        this.WalletMap = new Map();
        this.UserWalletMap = new Map();
        this.TransactionsMap = new Map();
    }
    CreateWallet() {
        const wallet = new index_1.default();
        this.WalletMap.set(wallet.publicKey, wallet);
        const userwallet = new note_entity_1.User_Wallet(wallet.publicKey, wallet.keypair.getPrivate());
        this.UserWalletMap.set(wallet.publicKey, userwallet);
        const new_keypair = new note_entity_1.Keypair();
        new_keypair.public = wallet.publicKey;
        new_keypair.private = wallet.keypair.getPrivate();
        return new_keypair;
    }
    getBalance(publicKey) {
        const wallet = this.UserWalletMap.get(publicKey);
        return wallet.balance;
    }
    getNFTBalance(publicKey) {
        const wallet = this.UserWalletMap.get(publicKey);
        return wallet.nft_balance;
    }
    getHistory(publicKey, nftquery) {
        const wallet = this.UserWalletMap.get(publicKey);
        if (nftquery.sort == "asc") {
            return wallet.transactions;
        }
    }
    transferMatic(dto) {
        const wallet_from = this.UserWalletMap.get(dto.from);
        const wallet_to = this.UserWalletMap.get(dto.to);
        wallet_from.balance.matic_balance -= dto.amount;
        wallet_to.balance.matic_balance += dto.amount;
        return chain_util_1.default.genHash(dto.from);
    }
    transferRuble(dto) {
        const wallet_from = this.UserWalletMap.get(dto.from);
        const wallet_to = this.UserWalletMap.get(dto.to);
        wallet_from.balance.ruble_balance -= dto.amount;
        wallet_to.balance.ruble_balance += dto.amount;
        return chain_util_1.default.genHash(dto.from);
    }
    transferNFT(dto) {
        const wallet_from = this.UserWalletMap.get(dto.from);
        const wallet_to = this.UserWalletMap.get(dto.to);
        return chain_util_1.default.genHash(dto.from);
    }
    getTransactionStatus(hash) {
        if (this.TransactionsMap.has(hash) == true)
            return "Success";
        else
            return "Error";
    }
    NFTInfo(token_id) {
    }
    NFTList(hash) {
    }
    NFTGenerate(dto) {
        const toPublicKey = dto.to;
        const uri = dto.uri;
        const count = dto.count;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)()
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=notes.service.js.map