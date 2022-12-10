import { ACCOUNTS_MODEL_NAME } from './../const/providers.const';
import { AccountSchema } from './../schemas/accounts.schema';
import { Connection } from 'mongoose';
import { DATABASE_PROVIDER_NAME } from '../const/providers.const';

export const accountsProviders = [
  {
    provide: ACCOUNTS_MODEL_NAME,
    useFactory: (connection: Connection) => connection.model('Accounts', AccountSchema),
    inject: [DATABASE_PROVIDER_NAME],
  },
];