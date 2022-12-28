import { AccountsModule } from '@accounts/accounts.module';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

let app: INestMicroservice;
async function bootstrap() {
  app = await NestFactory.createMicroservice(
    AccountsModule,
    {
      transport: Transport.TCP,
      port: process.env.PORT
    }
  );
  await app.listen();
}
bootstrap();

export { app };
