"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTInfo = exports.User_Wallet = exports.NFTBalance = exports.NFTCollection = exports.Balance = exports.Keypair = exports.Transaction = void 0;
const swagger_1 = require("@nestjs/swagger");
class Transaction {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of block", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "blockNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Time of transaction", nullable: false }),
    __metadata("design:type", Number)
], Transaction.prototype, "timeStamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Adress of contract", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "contractAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Transaction giver", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Transaction receiver", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Token ID", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Token name", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "tokenName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Token Symbol", nullable: false }),
    __metadata("design:type", String)
], Transaction.prototype, "tokenSymbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Amount of Gas used", nullable: false }),
    __metadata("design:type", Number)
], Transaction.prototype, "gasUsed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of Confirmations", nullable: false }),
    __metadata("design:type", Number)
], Transaction.prototype, "confirmations", void 0);
exports.Transaction = Transaction;
class Keypair {
}
exports.Keypair = Keypair;
class Balance {
    constructor() {
        this.matic_balance = 0;
        this.ruble_balance = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Matic Balance", nullable: true }),
    __metadata("design:type", Number)
], Balance.prototype, "matic_balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Ruble Balance", nullable: true }),
    __metadata("design:type", Number)
], Balance.prototype, "ruble_balance", void 0);
exports.Balance = Balance;
class NFTCollection {
    constructor() {
        this.tokens = [];
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Collection URI", nullable: true }),
    __metadata("design:type", String)
], NFTCollection.prototype, "URI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Tokens Array", nullable: true }),
    __metadata("design:type", Array)
], NFTCollection.prototype, "tokens", void 0);
exports.NFTCollection = NFTCollection;
class NFTBalance {
    constructor() {
        this.nft_collections = [];
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Balance", nullable: true }),
    __metadata("design:type", Array)
], NFTBalance.prototype, "nft_collections", void 0);
exports.NFTBalance = NFTBalance;
class User_Wallet {
    constructor(pub_key, priv_key) {
        this.transactions = [];
        this.nft_balance = [];
        this.balance = new Balance();
        this.pub_key = pub_key;
        this.priv_key = priv_key;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "All transactions of wallet", nullable: false }),
    __metadata("design:type", Array)
], User_Wallet.prototype, "transactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Public key of wallet", nullable: false }),
    __metadata("design:type", String)
], User_Wallet.prototype, "pub_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Private key of wallet", nullable: false }),
    __metadata("design:type", String)
], User_Wallet.prototype, "priv_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Balance of wallet", nullable: false }),
    __metadata("design:type", Balance)
], User_Wallet.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Balance of wallet", nullable: false }),
    __metadata("design:type", Array)
], User_Wallet.prototype, "nft_balance", void 0);
exports.User_Wallet = User_Wallet;
class NFTInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID of NFT", nullable: false }),
    __metadata("design:type", String)
], NFTInfo.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "URI of NFT", nullable: false }),
    __metadata("design:type", String)
], NFTInfo.prototype, "uri", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Owner of NFT", nullable: false }),
    __metadata("design:type", String)
], NFTInfo.prototype, "publicKey", void 0);
exports.NFTInfo = NFTInfo;
//# sourceMappingURL=note.entity.js.map