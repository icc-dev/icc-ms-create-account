import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): any {
    // return this.appService.getHello();
    return {
      hello: this.appService.getHello(),
      port: this.configService.get<string>('application.port'),
      environment: this.configService.get<string>('application.environment')
    }
  }
}
