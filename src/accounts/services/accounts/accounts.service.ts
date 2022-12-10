import { IAccount } from './../../interface/accounts.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAccountDto } from '../../../accounts/dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @Inject('ACCOUNTS_MODEL')
        private accountsModels: Model<IAccount>
    ) {}

    async addAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
        const accountRef = new this.accountsModels(createAccountDto);
        return accountRef.save();
    }
}
