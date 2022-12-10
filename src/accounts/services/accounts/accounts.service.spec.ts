import { Test, TestingModule } from '@nestjs/testing';
import { AccountsMockService } from './accounts.mock.service';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
    ],
    }).overrideProvider(AccountsService)
    .useClass(AccountsMockService)
    .compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll((done) => {
    done()
  })
});
