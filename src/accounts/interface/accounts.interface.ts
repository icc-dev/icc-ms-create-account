import { StatusAccountAvailable, TypeAccountAvailable } from "../enums/accounts.enum";
import { Document } from 'mongoose';

export interface IAccount extends Document {
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly lastLogin: Date;
    readonly status: StatusAccountAvailable;
    readonly accountType: TypeAccountAvailable;
    readonly restrictedByLevel: Boolean;
    readonly accountLevel: Number;
    readonly subscripted: Boolean;
    readonly email: String;
}