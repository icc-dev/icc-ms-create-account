import { TypeAccountAvailable, StatusAccountAvailable } from "../enums/accounts.enum";

export class CreateAccountDto {
    email: string;
    accountType: TypeAccountAvailable;
    status: StatusAccountAvailable;

    static describe(instance): Array<string> {
        return Object.getOwnPropertyNames(instance);
    }
}