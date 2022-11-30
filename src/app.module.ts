import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AccountsModule, CustomConfigModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
