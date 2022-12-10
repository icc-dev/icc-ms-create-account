import * as mongoose from 'mongoose';
import { getDate } from '../../utils/date.utils';
import { StatusAccountAvailable, TypeAccountAvailable } from '../enums/accounts.enum';



export const AccountSchema = new mongoose.Schema({
    // Datetime management
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    
    // Status management
    status: {
        type: Object.keys(StatusAccountAvailable),
        required: true
    },
    
    // features management
    accountType: {
        type:  Object.keys(TypeAccountAvailable),
        required: true
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
        index: true,
    },
});

AccountSchema.pre('save', function(next: Function) {
    const date = getDate();
    this.createdAt = date;
    this.updatedAt = date;
    next();
});
