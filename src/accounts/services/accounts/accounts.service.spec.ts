import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Accounts } from '../../../accounts/schemas/accounts.schema';
import { AccountsMockService } from './accounts.mock.service';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let model: Model<Accounts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Accounts.name),
          useClass: AccountsMockService
        }
    ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    model = module.get<Model<Accounts>>(getModelToken(Accounts.name));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
