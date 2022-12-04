import { Moment } from 'moment-timezone';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { getDate } from 'src/utils/date.utils';
import { StatusAccountAvailable, TypeAccountAvailable } from '../enums/accounts.enum';


@Schema()
export class Accounts {
    // Datetime management
    @Prop({
        type: Date,
    })
    createdAt: Moment;
    @Prop({
        type: Date
    })
    updatedAt: Moment;
    @Prop({
        type: Date
    })
    lastLogin: Moment;
    
    // Status management
    @Prop({
        lowercase: true,
        required: true,
    })
    status: StatusAccountAvailable;
    
    // features management
    @Prop({
        required: true,
    })
    accountType: TypeAccountAvailable;
    @Prop({
        default: false,
    })
    restrictedByLevel: boolean;
    @Prop({
        default: null
    })
    accountLevel: number;
    @Prop({
        default: false,
    })
    subscripted: boolean;
    @Prop({
        required: true,
        unique: true,
        index: true,
        type: String,
        lowercase: true,
        
    })
    email: string;
    
    
}

export type AccountDocument = HydratedDocument<Accounts>;
export const AccountsSchema = SchemaFactory.createForClass(Accounts);

AccountsSchema.pre<AccountDocument>('save', function(next: Function) {
    const date = getDate();
    this.createdAt = date;
    this.updatedAt = date;
    next();
});
