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
exports.NFTGenerateDto = exports.NFTQueryDto = exports.ExchangeNFTDto = exports.ExchangeMaticDto = exports.ExchangeRubleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ExchangeRubleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Ruble Sender", nullable: true }),
    __metadata("design:type", String)
], ExchangeRubleDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Ruble Receiver", nullable: true }),
    __metadata("design:type", String)
], ExchangeRubleDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Ruble Amount", nullable: true }),
    __metadata("design:type", Number)
], ExchangeRubleDto.prototype, "amount", void 0);
exports.ExchangeRubleDto = ExchangeRubleDto;
class ExchangeMaticDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Matic Sender", nullable: true }),
    __metadata("design:type", String)
], ExchangeMaticDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Matic Receiver", nullable: true }),
    __metadata("design:type", String)
], ExchangeMaticDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Matic Amount", nullable: true }),
    __metadata("design:type", Number)
], ExchangeMaticDto.prototype, "amount", void 0);
exports.ExchangeMaticDto = ExchangeMaticDto;
class ExchangeNFTDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Sender", nullable: true }),
    __metadata("design:type", String)
], ExchangeNFTDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Sender", nullable: true }),
    __metadata("design:type", String)
], ExchangeNFTDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Amount", nullable: true }),
    __metadata("design:type", Number)
], ExchangeNFTDto.prototype, "tokenId", void 0);
exports.ExchangeNFTDto = ExchangeNFTDto;
class NFTQueryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page Size", nullable: true }),
    __metadata("design:type", Number)
], NFTQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Offset Size", nullable: true }),
    __metadata("design:type", Number)
], NFTQueryDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sort type (asc or desc)", nullable: true }),
    __metadata("design:type", String)
], NFTQueryDto.prototype, "sort", void 0);
exports.NFTQueryDto = NFTQueryDto;
class NFTGenerateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "NFT Receiver", nullable: true }),
    __metadata("design:type", String)
], NFTGenerateDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "URI of NFT Collection", nullable: true }),
    __metadata("design:type", String)
], NFTGenerateDto.prototype, "uri", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Amount of NFT in Collection", nullable: true }),
    __metadata("design:type", Number)
], NFTGenerateDto.prototype, "count", void 0);
exports.NFTGenerateDto = NFTGenerateDto;
//# sourceMappingURL=create-note.dto.js.map