import { Injectable } from '@nestjs/common';
import { NFTGenerateDto, ExchangeRubleDto, ExchangeMaticDto, ExchangeNFTDto, NFTQueryDto } from './dto/create-note.dto';
import { User_Wallet, Transaction, Keypair } from './entities/note.entity';
import Wallet from '../../blockchain/src/wallet/index';
import ChainUtil from '../../blockchain/src/chain-util'

@Injectable()
export class WalletService {
  WalletMap = new Map<string, Wallet>();
  UserWalletMap = new Map<string, User_Wallet>();
  TransactionsMap = new Map<string, Transaction>();

  // функционал
  CreateWallet() { // создание кошелька
    const wallet = new Wallet(); 
    this.WalletMap.set(wallet.publicKey, wallet);
    const userwallet = new User_Wallet(wallet.publicKey, wallet.keypair.getPrivate());
    this.UserWalletMap.set(wallet.publicKey, userwallet);
    const new_keypair = new Keypair();
    new_keypair.public = wallet.publicKey;
    new_keypair.private = wallet.keypair.getPrivate();
    return new_keypair;
  }
   
  getBalance(publicKey: string) {
    // const wallet = this.WalletMap.get(publicKey); // получить кошелек по ключу
    const wallet = this.UserWalletMap.get(publicKey);
    return wallet.balance;
  }

  getNFTBalance(publicKey: string) { 
    // const wallet = this.WalletMap.get(publicKey); // получить кошелек по ключу
    const wallet = this.UserWalletMap.get(publicKey);
    return wallet.nft_balance;
  }

  getHistory(publicKey: string, nftquery: NFTQueryDto) {
    const wallet = this.UserWalletMap.get(publicKey);
    if (nftquery.sort == "asc") {
      return wallet.transactions;
    }

    // if (nftquery.sort == "desc") {
    //   // сортировать историю как?
    //   return wallet.history;
    // }
  }

  transferMatic(dto: ExchangeMaticDto) { // транзакция матика с одного кошелька на другой
    const wallet_from = this.UserWalletMap.get(dto.from);
    const wallet_to = this.UserWalletMap.get(dto.to);
    wallet_from.balance.matic_balance -= dto.amount;
    wallet_to.balance.matic_balance += dto.amount;
    return ChainUtil.genHash(dto.from); // ???
  }

  transferRuble(dto: ExchangeRubleDto) { // транзакция рубля с одного кошелька на другой
    const wallet_from = this.UserWalletMap.get(dto.from);
    const wallet_to = this.UserWalletMap.get(dto.to);
    wallet_from.balance.ruble_balance -= dto.amount;
    wallet_to.balance.ruble_balance += dto.amount;
    return ChainUtil.genHash(dto.from); // ???
  }

  transferNFT(dto: ExchangeNFTDto) { // транзакция матика с одного кошелька на другой
    const wallet_from = this.UserWalletMap.get(dto.from);
    const wallet_to = this.UserWalletMap.get(dto.to);
    //wallet_from.nft_balance -= dto.amount; найти нфт. вычесть нфт по айди
    //wallet_to.nft_balance += dto.amount; найди нфт. прибавить нфт по айди
    return ChainUtil.genHash(dto.from); // ???
  }

  getTransactionStatus(hash: string) {
    if (this.TransactionsMap.has(hash) == true) return "Success"
      else return "Error";
  }

  NFTInfo(token_id : string) {
    //  получить NFTInfo по айди
  }

  NFTList(hash: string) {
    // получить информацию о владельце по ид транзакции
  }

  NFTGenerate(dto: NFTGenerateDto) {
    const toPublicKey = dto.to;
    const uri = dto.uri;
    const count = dto.count;
    //получить хэш транзакции
  }

}