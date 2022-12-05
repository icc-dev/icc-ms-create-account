import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../../../accounts/services/accounts/accounts.service';
import { Accounts } from '../../../accounts/schemas/accounts.schema';
import { AddController } from './add.controller';
import { AccountsMockService } from '../../../accounts/services/accounts/accounts.mock.service';
import { Request, Response } from 'supertest';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

describe('AddController', () => {
  let controller: AddController;
  let response: any;
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddController],
      providers: [
        AccountsService,
        {
          provide: getModelToken(Accounts.name),
          useClass: AccountsMockService
        }
      ]
    }).compile();

    controller = module.get<AddController>(AddController);
    response = mockResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return 422 Unprocesable Entity', async () => {
    await controller.createAccount(
      response,
      {} as unknown as CreateAccountDto
    );
    console.log('response', JSON.stringify(response))
    expect(response.status).toHaveBeenCalledWith(422);
  });
});
