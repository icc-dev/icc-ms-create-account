import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CustomConfigModule } from './custom-config/custom-config.module';

@Module({
  imports: [AccountsModule, CustomConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
