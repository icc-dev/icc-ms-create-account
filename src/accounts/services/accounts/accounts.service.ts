import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts, AccountDocument } from '../../../accounts/schemas/accounts.schema';
import { Model } from 'mongoose';
import { CreateAccountDto } from '../../../accounts/dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectModel('Accounts')
        private accountsModels: Model<AccountDocument>
    ) {}

    async addAccount(createAccountDto: CreateAccountDto): Promise<Accounts> {
        const accountRef = new this.accountsModels(createAccountDto);
        return accountRef.save();
    }
}
