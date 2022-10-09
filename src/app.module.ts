import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './notes/notes.module';
//  import { AuthenticationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WalletModule /* ,
    //AuthenticationModule,
      ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }) */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
