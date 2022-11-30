import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
  );
  const config =  app.get(ConfigService);
  const port = config.get<number>('application.port');
  await app.listen(port);
  console.log(`Microservice already running in http://localhost:${port}/`)
}
bootstrap();
