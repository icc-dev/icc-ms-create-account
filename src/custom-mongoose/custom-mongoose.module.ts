import { ConfigService } from '@nestjs/config';
import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModuleOptions, MongooseModule, ModelDefinition } from '@nestjs/mongoose';

@Module({})
export class CustomMongooseModule extends MongooseModule {

    private static url: string;
    private static username: string;
    private static password: string;
    private static databasename: string;

    constructor(configService: ConfigService) {
        super();
        CustomMongooseModule.url = configService.get<string>('database.url');
        CustomMongooseModule.username = configService.get<string>('database.username');
        CustomMongooseModule.password = configService.get<string>('database.password');
        CustomMongooseModule.databasename = configService.get<string>('database.databasename');
    }

    static forRoot(uri?: string, options?: MongooseModuleOptions): DynamicModule {
        uri = `mongodb+srv://${this.username}:${this.password}@${this.url}/${this.databasename}`;
        return super.forRoot(uri, options);
    }

    static forFeature(models?: ModelDefinition[], connectionName?: string): DynamicModule {
        return super.forFeature(models, connectionName);
    }
}
