import { LoggerService } from '@logger/logger.service';
import { IAccount } from '@accounts/interface/accounts.interface';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { ACCOUNTS_MOCK } from '../mock/accounts.mock';
import { equals } from '@utils/object.utils';
@Injectable()
export class AccountsMockService {
    private data = ACCOUNTS_MOCK;

    constructor() {}

    async addAccount(createAccountDto: CreateAccountDto, logger: LoggerService): Promise<IAccount> {
        logger.log('Saving user', createAccountDto);
        if (!equals(Object.keys(createAccountDto), CreateAccountDto.describe(createAccountDto))) {
            throw new Error("ValidationError");
        }
        this.data.forEach((account) => {
            if (account.email === createAccountDto.email) {
                throw {
                    index: 0,
                    code: 11000,
                    keyPattern: {
                        email: 1
                    },
                    keyValue: {
                        email: createAccountDto.email
                    }
                };
            }
        });
        const newData = {
            ...this.data[0],
            email: createAccountDto.email,
            status: createAccountDto.status,
            accountType: createAccountDto.accountType
        } as unknown as IAccount
        this.data.push(newData);
        return newData as IAccount;
    }
}
