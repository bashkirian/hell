import { NFTGenerateDto, ExchangeRubleDto, ExchangeMaticDto, ExchangeNFTDto, NFTQueryDto } from './dto/create-note.dto';
import { User_Wallet, Transaction, Keypair } from './entities/note.entity';
import Wallet from '../../blockchain/src/wallet/index';
export declare class WalletService {
    WalletMap: Map<string, Wallet>;
    UserWalletMap: Map<string, User_Wallet>;
    TransactionsMap: Map<string, Transaction>;
    CreateWallet(): Keypair;
    getBalance(publicKey: string): import("./entities/note.entity").Balance;
    getNFTBalance(publicKey: string): import("./entities/note.entity").NFTBalance[];
    getHistory(publicKey: string, nftquery: NFTQueryDto): Transaction[];
    transferMatic(dto: ExchangeMaticDto): string;
    transferRuble(dto: ExchangeRubleDto): string;
    transferNFT(dto: ExchangeNFTDto): string;
    getTransactionStatus(hash: string): "Success" | "Error";
    NFTInfo(token_id: string): void;
    NFTList(hash: string): void;
    NFTGenerate(dto: NFTGenerateDto): void;
}
