import { WalletService } from './notes.service';
import { NFTGenerateDto, ExchangeRubleDto, ExchangeMaticDto, ExchangeNFTDto, NFTQueryDto } from './dto/create-note.dto';
import { Keypair, Balance, Transaction, NFTBalance } from './entities/note.entity';
export declare class TransferController {
    private readonly services;
    constructor(services: WalletService);
    transferMatic(exchangeMaticDto: ExchangeMaticDto): string;
    transferRuble(exchangeRubleDto: ExchangeRubleDto): string;
    transferNFT(exchangeNFTDto: ExchangeNFTDto): string;
    getTransactionStatus(transactionHash: string): "Success" | "Error";
}
export declare class WalletController {
    private readonly services;
    constructor(services: WalletService);
    createNewWallet(): Keypair;
    getUserBalance(publicKey: string): Balance;
    getUserNFTBalance(publicKey: string): NFTBalance[];
    getUserHistory(nftquery: NFTQueryDto, publicKey: string): Transaction[];
}
export declare class NFTController {
    private readonly services;
    constructor(services: WalletService);
    NFTInfo(tokenId: string): void;
    NFTGenerate(nftGenerateDto: NFTGenerateDto): void;
}
