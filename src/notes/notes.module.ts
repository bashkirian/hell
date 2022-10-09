import { Module } from '@nestjs/common';

import { WalletService } from './notes.service';
import { WalletController } from './notes.controller';

@Module({
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
