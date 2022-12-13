import * as mongoose from 'mongoose';
import { getDate } from '@utils/date.utils';
import { StatusAccountAvailable, TypeAccountAvailable } from '../enums/accounts.enum';



export const AccountSchema = new mongoose.Schema({
    // Datetime management
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    
    // Status management
    status: {
        type: String,
        required: true,
        enum: StatusAccountAvailable
    },
    
    // features management
    accountType: {
        type: String,
        required: true,
        enum: TypeAccountAvailable
    },
    restrictedByLevel: {
        type: Boolean,
        default: false,
    },
    accountLevel: {
        type: Number,
        default: null,
    },
    subscripted: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    accountId: String,
}).index({ email: 1 }, { unique: true, name: 'emailUniqueKey'});

AccountSchema.pre('save', function(next: Function) {
    const date = getDate();
    this.createdAt = date;
    this.updatedAt = date;
    this.accountId = this._id.toString();
    next();
});