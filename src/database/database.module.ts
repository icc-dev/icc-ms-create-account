import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';

@Module({
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}