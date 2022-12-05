import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'application.port') return 3000
              if (key === 'application.environment') return 'testing'
              if (key === 'application.timeZone') return 'America/Santiago'
            })
          }
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return object', () => {
      const expectedValue = {"environment": "testing", "port": 3000}
      expect(appController.getHello()).toStrictEqual(expectedValue);
    });
  });
});
