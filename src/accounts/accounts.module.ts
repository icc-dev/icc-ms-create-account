import { ConfigModule, ConfigService} from '@nestjs/config';
import { Accounts, AccountsSchema } from './schemas/accounts.schema';
import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { AddController } from './controllers/add/add.controller';
import { AccountsService } from './services/accounts/accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        CustomConfigModule,
        MongooseModule.forRootAsync({
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
        }),
        MongooseModule.forFeature([
            {
                name: Accounts.name,
                schema: AccountsSchema,
            }
        ])
    ],
    controllers: [AddController],
    providers: [AccountsService]
})
export class AccountsModule {}
