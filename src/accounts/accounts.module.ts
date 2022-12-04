import { ConfigModule, ConfigService} from '@nestjs/config';
import { Accounts, AccountsSchema } from './schemas/accounts.schema';
import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { AddController } from './controllers/add/add.controller';
import { AccountsService } from './services/accounts/accounts.service';
import { AccountsMockService } from './services/accounts/accounts.mock.service';
import { MongooseModule } from '@nestjs/mongoose';

const configMongoose = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${
                configService.get<string>('database.username')
            }:${
                configService.get<string>('database.password')
            }@${
                configService.get<string>('database.host')
            }/${
                configService.get<string>('database.databasename')
            }`
    }),
    inject: [ConfigService],
}

const accountServiceProvider = {
    provide: AccountsService,
    useClass:
        process.env.NODE_ENV === 'testing' ?
        AccountsMockService : AccountsService
}
@Module({
    imports: [
        CustomConfigModule,
        MongooseModule.forRootAsync(configMongoose),
        MongooseModule.forFeature([
            {
                name: Accounts.name,
                schema: AccountsSchema,
            }
        ])
    ],
    controllers: [AddController],
    providers: [accountServiceProvider]
})
export class AccountsModule {}
