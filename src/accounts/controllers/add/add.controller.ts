import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@icc-dev/icc-log-service'
import { Controller, Post, Res, Body, HttpStatus, HttpCode, Version, Inject } from '@nestjs/common';
import { Response } from 'express';
import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedAccountDto } from '@accounts/dto/created-account.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { EMPTY, firstValueFrom } from 'rxjs';

@Controller('add')
export class AddController {
    constructor(
        private accountsService: AccountsService,
        private loggerService: LoggerService,
        private configService: ConfigService,
        @Inject('EMAIL_SERVICE') private emailService: ClientProxy,
    ) { }

    @MessagePattern({ cmd: 'create_new_account' })
    async createAccount(createAccountDto: CreateAccountDto) {
        try {
            this.loggerService.log('Create account controller init');
            this.loggerService.log('Get configuration email');
            const tempalteId = this.configService.getOrThrow<string>('email.templateId')
            this.loggerService.log('Template getting', tempalteId)
            if (!createAccountDto || !Object.keys(createAccountDto).length) {
                this.loggerService.warn('Unprocessable entity', createAccountDto);
                return Promise.reject({ message: 'Unprocessable entity', data: createAccountDto })
            }
            const accountCreated = await this.accountsService.addAccount(createAccountDto, this.loggerService);
            this.loggerService.log('Add account intruction finished correctly', accountCreated);
            await firstValueFrom(this.emailService.send({cmd: 'send_email'}, {
                to: accountCreated.email,
                dynamicTemplateData: accountCreated,
                templateId: tempalteId
            })).catch(error => {
                this.loggerService.error('Mail not sended', error);
                return EMPTY
            });
            return Promise.resolve({
                message: 'created',
                data: accountCreated
            })
        } catch (error) {
            this.loggerService.error('An error has occurred', error);
            return Promise.reject({ message: 'Internal server error', data: error })
        }
    }
}
