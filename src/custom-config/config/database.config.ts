import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    databasename: process.env.DATABASE_NAME || 'default',
}));
