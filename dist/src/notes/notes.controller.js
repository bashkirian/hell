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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTController = exports.WalletController = exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const create_note_dto_1 = require("./dto/create-note.dto");
const swagger_1 = require("@nestjs/swagger");
const note_entity_1 = require("./entities/note.entity");
let TransferController = class TransferController {
    constructor(services) {
        this.services = services;
    }
    transferMatic(exchangeMaticDto) {
        return this.services.transferMatic(exchangeMaticDto);
    }
    transferRuble(exchangeRubleDto) {
        return this.services.transferRuble(exchangeRubleDto);
    }
    transferNFT(exchangeNFTDto) {
        return this.services.transferNFT(exchangeNFTDto);
    }
    getTransactionStatus(transactionHash) {
        return this.services.getTransactionStatus(transactionHash);
    }
};
__decorate([
    (0, common_1.Post)('matic'),
    (0, swagger_1.ApiOperation)({ summary: "Transfer Matic from one to another" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.ExchangeMaticDto]),
    __metadata("design:returntype", void 0)
], TransferController.prototype, "transferMatic", null);
__decorate([
    (0, common_1.Post)('ruble'),
    (0, swagger_1.ApiOperation)({ summary: "Transfer Ruble from one to another" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.ExchangeRubleDto]),
    __metadata("design:returntype", void 0)
], TransferController.prototype, "transferRuble", null);
__decorate([
    (0, common_1.Post)('nft'),
    (0, swagger_1.ApiOperation)({ summary: "Transfer NFT from one to another" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.ExchangeNFTDto]),
    __metadata("design:returntype", void 0)
], TransferController.prototype, "transferNFT", null);
__decorate([
    (0, common_1.Post)('status/:transactionHash'),
    (0, swagger_1.ApiOperation)({ summary: "Get status of transaction" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Param)('transactionHash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransferController.prototype, "getTransactionStatus", null);
TransferController = __decorate([
    (0, swagger_1.ApiTags)('Transfers'),
    (0, common_1.Controller)('v1/transfers'),
    __metadata("design:paramtypes", [notes_service_1.WalletService])
], TransferController);
exports.TransferController = TransferController;
let WalletController = class WalletController {
    constructor(services) {
        this.services = services;
    }
    createNewWallet() {
        return this.services.CreateWallet();
    }
    getUserBalance(publicKey) {
        return this.services.getBalance(publicKey);
    }
    getUserNFTBalance(publicKey) {
        return this.services.getNFTBalance(publicKey);
    }
    getUserHistory(nftquery, publicKey) {
        return this.services.getHistory(publicKey, nftquery);
    }
};
__decorate([
    (0, common_1.Post)('new'),
    (0, swagger_1.ApiOperation)({ summary: "Creates a new wallet for user" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: note_entity_1.Keypair }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "createNewWallet", null);
__decorate([
    (0, common_1.Get)(':publicKey/balance'),
    (0, swagger_1.ApiOperation)({ summary: "Returns Balance of wallet by public key" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: note_entity_1.Balance }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Param)('publicKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getUserBalance", null);
__decorate([
    (0, common_1.Get)(':publicKey/nft/balance'),
    (0, swagger_1.ApiOperation)({ summary: "Returns NFT Balance of wallet by public key" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: note_entity_1.NFTBalance }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Param)('publicKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getUserNFTBalance", null);
__decorate([
    (0, common_1.Get)(':publicKey/history'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('publicKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.NFTQueryDto, String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getUserHistory", null);
WalletController = __decorate([
    (0, swagger_1.ApiTags)('Wallets'),
    (0, common_1.Controller)('v1/wallets'),
    __metadata("design:paramtypes", [notes_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
let NFTController = class NFTController {
    constructor(services) {
        this.services = services;
    }
    NFTInfo(tokenId) {
        return this.services.NFTInfo(tokenId);
    }
    NFTGenerate(nftGenerateDto) {
        return this.services.NFTGenerate(nftGenerateDto);
    }
};
__decorate([
    (0, common_1.Get)(':tokenId'),
    (0, swagger_1.ApiOperation)({ summary: "Transfer NFT from one to another" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Param)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NFTController.prototype, "NFTInfo", null);
__decorate([
    (0, common_1.Get)('generate'),
    (0, swagger_1.ApiOperation)({ summary: "Transfer NFT from one to another" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: "Success", type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: "Bad Request" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.NFTGenerateDto]),
    __metadata("design:returntype", void 0)
], NFTController.prototype, "NFTGenerate", null);
NFTController = __decorate([
    (0, swagger_1.ApiTags)('NFT'),
    (0, common_1.Controller)('v1/nft'),
    __metadata("design:paramtypes", [notes_service_1.WalletService])
], NFTController);
exports.NFTController = NFTController;
//# sourceMappingURL=notes.controller.js.map