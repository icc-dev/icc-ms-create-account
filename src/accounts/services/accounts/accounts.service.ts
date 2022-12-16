import { LoggerService } from '@icc-dev/icc-log-service';
import { IAccount } from '@accounts/interface/accounts.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAccountDto } from '@accounts/dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @Inject('ACCOUNTS_MODEL')
        private accountsModels: Model<IAccount>
    ) {}

    async addAccount(createAccountDto: CreateAccountDto, logger: LoggerService): Promise<IAccount> {
        logger.log('Saving user', createAccountDto);
        const accountRef = new this.accountsModels(createAccountDto);
        const validateError = accountRef.validateSync();
        if (validateError) {
            throw validateError['errors'];
        }
        return accountRef.save();
    }
}
