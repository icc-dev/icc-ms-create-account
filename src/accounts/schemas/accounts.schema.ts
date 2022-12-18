import * as mongoose from 'mongoose';
import { getDate } from '@utils/date.utils';
import { StatusAccountAvailable, TypeAccountAvailable } from '../enums/accounts.enum';
import * as crypto from 'crypto';

function omitSensitive(_doc, obj) {
    delete obj.password;
    return obj;
}

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
    password: {
        type: String,
        required: true,
    }
}, {toJSON: { transform: omitSensitive }}).index({ email: 1 }, { unique: true, name: 'emailUniqueKey'});

AccountSchema.pre('save', function(next: Function) {
    const date = getDate();
    this.createdAt = date;
    this.updatedAt = date;
    this.accountId = this._id.toString();
    next();
});

AccountSchema.methods.setPassword = function(password: string) { 
    // Creating a unique salt for a particular account 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    // Hashing account's salt and password with 1000 iterations, 
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        8000,
        64,
        'sha512'
    ).toString('hex'); 
}; 