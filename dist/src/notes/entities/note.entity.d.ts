export declare class Transaction {
    blockNumber: string;
    timeStamp: number;
    contractAddress: string;
    from: string;
    to: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    gasUsed: number;
    confirmations: number;
}
export declare class Keypair {
    public: string;
    private: string;
}
export declare class Balance {
    matic_balance: number;
    ruble_balance: number;
}
export declare class NFTCollection {
    URI: string;
    tokens: number[];
}
export declare class NFTBalance {
    nft_collections: NFTCollection[];
}
export declare class User_Wallet {
    transactions: Transaction[];
    pub_key: string;
    priv_key: string;
    balance: Balance;
    nft_balance: NFTBalance[];
    constructor(pub_key: string, priv_key: string);
}
export declare class NFTInfo {
    tokenId: string;
    uri: string;
    publicKey: string;
}
