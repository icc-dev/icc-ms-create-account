import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

// config files
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';

const configModule = ConfigModule.forRoot({
    load: [databaseConfig, appConfig]
});

@Module({
    imports: [configModule],
    exports: [configModule],
})
export class CustomConfigModule { }
