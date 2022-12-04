import { Injectable } from '@nestjs/common';
import { Accounts } from '../../schemas/accounts.schema';
import { CreateAccountDto } from '../../../accounts/dto/create-account.dto';
import { ACCOUNTS_MOCK } from '../mock/accounts.mock';
import { equals } from '../../../utils/object.utils';
@Injectable()
export class AccountsMockService {
    private data = ACCOUNTS_MOCK;

    constructor() {}

    async addAccount(createAccountDto: CreateAccountDto): Promise<Accounts> {
        if (!equals(Object.keys(createAccountDto), CreateAccountDto.describe(createAccountDto))) {
            throw new Error("ValidationError");
        }
        this.data.forEach((account) => {
            if (account.email === createAccountDto.email) {
                throw new Error("PrimarykeyError");
            }
        });
        const newData = {
            ...this.data[0],
            email: createAccountDto.email,
            status: createAccountDto.status,
            accountType: createAccountDto.accountType
        }
        this.data.push(newData);
        return newData as Accounts;
    }
}
