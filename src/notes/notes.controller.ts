import { 
  Controller, Get, Post, 
  Body, Param, HttpStatus
} from '@nestjs/common';
import { WalletService } from './notes.service';

import { NFTGenerateDto, ExchangeRubleDto, ExchangeMaticDto, ExchangeNFTDto, NFTQueryDto} from './dto/create-note.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Keypair, Balance, Transaction, NFTBalance, NFTInfo} from './entities/note.entity';

// // Все запросы, содержащие в пути /notes, будут перенаправлены в этот контроллер
// @ApiTags('Notes')
// @Controller('notes')
// export class NotesController {
//   constructor(private readonly notesService: NotesService) {}

//   @Post() // обработает POST http://localhost/notes?userId={userId}
//   @UseGuards(AuthGuard("api-key"))
//   @ApiOperation({ summary: "Creates a new note for the user" })
//   @ApiQuery({ name: "userId", required: true, description: "User identifier" })
//   @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note })
//   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
//   @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
//   create(
//   	@Query('userId', new ParseIntPipe()) userId: number, // <--- достанет userId из query строки  
//    	@Body() createNoteDto: CreateNoteDto
// 	) {
//     return this.notesService.create(userId, createNoteDto);
//   }

//   @Get() // обработает GET http://localhost/notes?userId={userId}
//   @UseGuards(AuthGuard("api-key"))
//   @ApiOperation({ summary: "Returns all available notes for the user" })
//   @ApiQuery({ name: "userId", required: true, description: "User identifier" })
//   @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note, isArray: true })
//   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
//   @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
//   findAll(@Query('userId', new ParseIntPipe()) userId: number) {
//     return this.notesService.findAll(userId);
//   }

//   @Get(':noteId') // обработает GET http://localhost/notes/{noteId}
//   @UseGuards(AuthGuard("api-key"))
//   @ApiOperation({ summary: "Returns a note with specified id" })
//   @ApiParam({ name: "noteId", required: true, description: "Note identifier" })
//   @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note })
//   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
//   @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
//   findOne(@Param('noteId', new ParseIntPipe()) noteId: number) {
//     return this.notesService.findOne(noteId);
//   }
// }

// /v1/wallets


@ApiTags('Transfers')
@Controller('v1/transfers')
export class TransferController {
    constructor(private readonly services: WalletService) { }

    @Post('matic')
    @ApiOperation({ summary: "Transfer Matic from one to another" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    transferMatic(@Body() exchangeMaticDto : ExchangeMaticDto) {
        return this.services.transferMatic(exchangeMaticDto);
    }

    @Post('ruble')
    @ApiOperation({ summary: "Transfer Ruble from one to another" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    transferRuble(@Body() exchangeRubleDto : ExchangeRubleDto) {
        return this.services.transferRuble(exchangeRubleDto);
    }

    @Post('nft')
    @ApiOperation({ summary: "Transfer NFT from one to another" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    transferNFT(@Body() exchangeNFTDto : ExchangeNFTDto) {
        return this.services.transferNFT(exchangeNFTDto);
    }

    @Post('status/:transactionHash')
    @ApiOperation({ summary: "Get status of transaction" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getTransactionStatus(@Param('transactionHash') transactionHash: string) {
      return this.services.getTransactionStatus(transactionHash);
    }
}

@ApiTags('Wallets')
@Controller('v1/wallets')
export class WalletController {
    constructor(private readonly services: WalletService) { }

    @Post('new')
    @ApiOperation({ summary: "Creates a new wallet for user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Keypair })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    createNewWallet() {
        return this.services.CreateWallet();
    }

    @Get(':publicKey/balance')
    @ApiOperation({ summary: "Returns Balance of wallet by public key" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Balance })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getUserBalance(@Param('publicKey') publicKey: string) {
        return this.services.getBalance(publicKey);
    }

    @Get(':publicKey/nft/balance')
    @ApiOperation({ summary: "Returns NFT Balance of wallet by public key" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: NFTBalance })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    getUserNFTBalance(@Param('publicKey') publicKey: string) {
        return this.services.getNFTBalance(publicKey);
    }

    @Get(':publicKey/history')
    getUserHistory(@Body() nftquery : NFTQueryDto,
                   @Param('publicKey') publicKey: string) {
        return this.services.getHistory(publicKey, nftquery);
    }
}

@ApiTags('NFT')
@Controller('v1/nft')
export class NFTController { 
    constructor(private readonly services: WalletService) { }

    @Get(':tokenId')
    @ApiOperation({ summary: "Transfer NFT from one to another" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    NFTInfo(@Param('tokenId') tokenId: string) {
        return this.services.NFTInfo(tokenId);
    }

    // @Get('generate/:transactionHash')
    // @ApiOperation({ summary: "Transfer NFT from one to another" })
    // @ApiResponse({ status: HttpStatus.OK, description: "Success", type: NFTInfo })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    // NFTList(@Param('transactionHash') transactionHash: string) {
    //     return this.services.NFTList(transactionHash);
    // }

    @Get('generate')
    @ApiOperation({ summary: "Transfer NFT from one to another" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    NFTGenerate(@Body() nftGenerateDto : NFTGenerateDto) {
        return this.services.NFTGenerate(nftGenerateDto);
    }
}