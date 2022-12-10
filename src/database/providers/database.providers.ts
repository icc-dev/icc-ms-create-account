import * as mongoose from 'mongoose';
import { DATABASE_PROVIDER_NAME } from '../const/providers.const';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER_NAME,
    useFactory: () => {
      return mongoose.connect(
        `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      );
    },
  },
];
