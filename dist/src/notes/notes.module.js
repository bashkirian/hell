"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const notes_controller_1 = require("./notes.controller");
const notes_controller_2 = require("./notes.controller");
const notes_controller_3 = require("./notes.controller");
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    (0, common_1.Module)({
        controllers: [notes_controller_1.WalletController, notes_controller_2.NFTController, notes_controller_3.TransferController],
        providers: [notes_service_1.WalletService]
    })
], WalletModule);
exports.WalletModule = WalletModule;
//# sourceMappingURL=notes.module.js.map