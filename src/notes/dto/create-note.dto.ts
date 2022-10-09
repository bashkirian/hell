import { ApiProperty } from "@nestjs/swagger";

export class ExchangeRubleDto {
    @ApiProperty({ description: "Ruble Sender", nullable: true })
    from: string;

    @ApiProperty({ description: "Ruble Receiver", nullable: true })
    to: string;

    @ApiProperty({ description: "Ruble Amount", nullable: true })
    amount: number;
}

export class ExchangeMaticDto {
    @ApiProperty({ description: "Matic Sender", nullable: true })
    from: string;

    @ApiProperty({ description: "Matic Receiver", nullable: true })
    to: string;

    @ApiProperty({ description: "Matic Amount", nullable: true })
    amount: number;
}

export class ExchangeNFTDto {
    @ApiProperty({ description: "NFT Sender", nullable: true })
    from: string;

    @ApiProperty({ description: "NFT Sender", nullable: true })
    to: string;

    @ApiProperty({ description: "NFT Amount", nullable: true })
    tokenId: number;
}

export class NFTQueryDto {
    @ApiProperty({ description: "Page Size", nullable: true })
    page: number;

    @ApiProperty({ description: "Offset Size", nullable: true })
    offset: number;

    @ApiProperty({ description: "Sort type (asc or desc)", nullable: true })
    sort: string;
}

export class NFTGenerateDto {
    @ApiProperty({ description: "NFT Receiver", nullable: true })
    to: string;

    @ApiProperty({ description: "URI of NFT Collection", nullable: true })
    uri: string;

    @ApiProperty({ description: "Amount of NFT in Collection", nullable: true })
    count: number;
}