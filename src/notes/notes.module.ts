import { Module } from '@nestjs/common';

import { WalletService } from './notes.service';
import { WalletController } from './notes.controller';
import { NFTController } from './notes.controller';
import { TransferController } from './notes.controller';

@Module({
  controllers: [WalletController, NFTController, TransferController],
  providers: [WalletService]
})
export class WalletModule {}
