import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
    port: process.env.PORT || 3000,
    environment: process.env.ENVIRONMENT || 'development',
    timeZone: process.env.TZ || 'America/Santiago'
}));
