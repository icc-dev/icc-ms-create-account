import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../../../accounts/services/accounts/accounts.service';
import { AddController } from './add.controller';
import { AccountsMockService } from '../../../accounts/services/accounts/accounts.mock.service';
import { CreateAccountDto } from '../../../accounts/dto/create-account.dto';
import { DUPLICATE_CREATE_ACCOUNT_DTO, MISSING_CREATE_ACCOUNT_DTO, VALID_CREATE_ACCOUNT_DTO } from '../../../accounts/services/mock/accounts.mock';

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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddController],
      providers: [
        AccountsService,
      ]
    }).overrideProvider(AccountsService)
    .useClass(AccountsMockService)
    .compile();

    controller = module.get<AddController>(AddController);

  })

  beforeEach(() => {
    response = mockResponse();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('422 Unprocessable Entity', () => {
    it('should be return 422 empty body', async () => {
      await controller.createAccount(
        response,
        {} as unknown as CreateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(422);
    });
    it('should be return 422 null body', async () => {
      await controller.createAccount(
        response,
        null
      );
      expect(response.status).toHaveBeenCalledWith(422);
    });
  });

  describe('201 Created', () => {
    it('should be return 201 with body', async () => {
      await controller.createAccount(
        response,
        VALID_CREATE_ACCOUNT_DTO as CreateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(201);
    });
  });

  describe('500 Internal Server Error', () => {
    it('should be return 500 exists user', async () => {
      await controller.createAccount(
        response,
        DUPLICATE_CREATE_ACCOUNT_DTO as CreateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(500);
    });
    it('should be return 500 missing accountType', async () => {
      await controller.createAccount(
        response,
        MISSING_CREATE_ACCOUNT_DTO as CreateAccountDto
      );
      expect(response.status).toHaveBeenCalledWith(500);
    });
  });


});
