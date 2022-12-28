import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AccountsModule } from '@accounts/accounts.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AccountsModule,
        ClientsModule.register([
          { name: 'EMAIL_SERVICE', transport: Transport.TCP },
        ]),
      ],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('EMAIL_SERVICE');
    await client.connect();
  });

});
