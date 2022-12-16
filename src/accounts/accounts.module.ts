import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CustomConfigModule } from '@config/custom-config.module';
import { AddController } from './controllers/add/add.controller';
import { AccountsService } from './services/accounts/accounts.service';
import { AccountsMockService } from './services/accounts/accounts.mock.service';
import { accountsProviders } from './providers/accounts.providers';
import { LoggerModule } from '@icc-dev/icc-log-service'


const accountServiceProvider = {
    provide: AccountsService,
    useClass:
        process.env.NODE_ENV === 'development' ?
        AccountsMockService : AccountsService
}

@Module({
    imports: [
        CustomConfigModule,
        DatabaseModule,
        LoggerModule.forRoot({
            meta: {
                saga: 'accounts',
                service: 'create',
                type: 'ms',
            }
        }),
    ],
    controllers: [AddController],
    providers: [
        accountServiceProvider,
        ...accountsProviders,
    ]
})
export class AccountsModule {}
