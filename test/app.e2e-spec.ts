import 'reflect-metadata';

import { AccountsModule } from './../src/accounts/accounts.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/icc/ms/accounts/v1/add (POST)', () => {
    return request(app.getHttpServer())
      .post('/icc/ms/accounts/v1/add')
      .expect(200)
      .expect('Hello World!');
  });

});
