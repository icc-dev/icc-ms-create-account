import { Controller, Post, Res, Body, HttpStatus, HttpCode, Version, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { CreateAccountDto } from '../../../accounts/dto/create-account.dto';
import { AccountsService } from '../../../accounts/services/accounts/accounts.service';

@Controller('add')
export class AddController {
    constructor(
        private accountsService: AccountsService,
    ) {}

    @Post()
    @HttpCode(201)
    @Version('1')
    async createAccount(@Res() res: Response, @Body() createAccountDto: CreateAccountDto) {
        try {
            if (!createAccountDto || !Object.keys(createAccountDto).length) {
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
            }
            const accountCreated = await this.accountsService.addAccount(createAccountDto);
            return res.status(HttpStatus.CREATED).send({accountCreated});
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error
            });
        }
    }
}
