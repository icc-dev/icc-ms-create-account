import { ConfigService } from '@nestjs/config';
import { app } from '../main';


export function getDate() {
    const configService = app.get(ConfigService);
    const date = new Date().toLocaleString('es-ES', {
        timeZone: configService.get<string>('application.timeZone'),
    });

    return new Date(date);
}
