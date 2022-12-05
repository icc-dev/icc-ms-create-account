import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): any {
    return {
      port: this.configService.get<string>('application.port'),
      environment: this.configService.get<string>('application.environment')
    }
  }
}
