import { StatusAccountAvailable, TypeAccountAvailable } from "../../../accounts/enums/accounts.enum";
import { Accounts } from "../../../accounts/schemas/accounts.schema";

export const VALID_CREATE_ACCOUNT_DTO = {
    email: "iancardernas96@gmail.cl",
    status: StatusAccountAvailable.ACTIVE,
    accountType: TypeAccountAvailable.USER,
}

export const DUPLICATE_CREATE_ACCOUNT_DTO = {
    email: "iancardernas96@gmail.com",
    status: StatusAccountAvailable.ACTIVE,
    accountType: TypeAccountAvailable.USER,
}

export const MISSING_CREATE_ACCOUNT_DTO = {
    email: "iancardernas96@gmail.com",
    status: StatusAccountAvailable.ACTIVE,
}

export const ACCOUNTS_MOCK = [
    {
        status: "active",
        accountType: "user",
        restrictedByLevel: false,
        accountLevel: null,
        subscripted: false,
        email: "iancardernas96@gmail.com",
        createdAt: {
            $date: {
                $numberLong: "1670122309248"
            }
        },
        updatedAt: {
            $date: {
                $numberLong: "1670122309248"
            }
        },
    }
] as unknown as Accounts[];
