import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

// config files
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import emailConfig from './config/email.config';

const configModule = ConfigModule.forRoot({
    load: [databaseConfig, appConfig, emailConfig]
});

@Module({
    imports: [configModule],
    exports: [configModule],
})
export class CustomConfigModule { }
