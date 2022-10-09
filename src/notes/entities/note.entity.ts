import { ApiProperty } from "@nestjs/swagger";

export class Transaction {
    @ApiProperty({ description: "Number of block", nullable: false })
    blockNumber: string;

    @ApiProperty({ description: "Time of transaction", nullable: false })
    timeStamp: number;

    @ApiProperty({ description: "Adress of contract", nullable: false })
    contractAddress: string;

    @ApiProperty({ description: "Transaction giver", nullable: false })
    from: string;

    @ApiProperty({ description: "Transaction receiver", nullable: false })
    to: string;

    @ApiProperty({ description: "Token ID", nullable: false })
    tokenId: string;

    @ApiProperty({ description: "Token name", nullable: false })
    tokenName: string;

    @ApiProperty({ description: "Token Symbol", nullable: false })
    tokenSymbol: string;

    @ApiProperty({ description: "Amount of Gas used", nullable: false })
    gasUsed: number;

    @ApiProperty({ description: "Number of Confirmations", nullable: false })
    confirmations: number;

    // constructor(id: number, userId: number, title: string = "", content: string = "") {
        
    // }
}

export class Keypair {
    public: string;
    private: string;
  }

export class Balance {
    @ApiProperty({ description: "Matic Balance", nullable: true })
    matic_balance: number = 0;

    @ApiProperty({ description: "Ruble Balance", nullable: true })
    ruble_balance: number = 0;
}

export class NFTCollection {
    @ApiProperty({ description: "NFT Collection URI", nullable: true })
    URI: string;

    @ApiProperty({ description: "NFT Tokens Array", nullable: true })
    tokens: number[] = [];
}

export class NFTBalance {
    @ApiProperty({ description: "NFT Balance", nullable: true })
    nft_collections: NFTCollection[] = [];
}

export class User_Wallet {
    @ApiProperty({ description: "All transactions of wallet", nullable: false })
    transactions: Transaction[] = [];

    @ApiProperty({ description: "Public key of wallet", nullable: false })
    pub_key: string;

    @ApiProperty({ description: "Private key of wallet", nullable: false })
    priv_key: string;

    @ApiProperty({ description: "Balance of wallet", nullable: false })
    balance: Balance;

    @ApiProperty({ description: "NFT Balance of wallet", nullable: false })
    nft_balance: NFTBalance[] = [];

    constructor(pub_key: string, priv_key: string) {
        this.balance = new Balance();
        this.pub_key = pub_key;
        this.priv_key = priv_key;
    }
}

export class NFTInfo {
    @ApiProperty({ description: "ID of NFT", nullable: false })
    tokenId: string;

    @ApiProperty({ description: "URI of NFT", nullable: false })
    uri: string;

    @ApiProperty({ description: "Owner of NFT", nullable: false })
    publicKey: string;
}