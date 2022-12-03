import { ConfigService } from '@nestjs/config';
import app from '../main';

const configService = app.get(ConfigService);

export function getDate() {
    const date = new Date().toLocaleString('es-ES', {
        timeZone: configService.get<string>('application.timeZone'),
    });

    return new Date(date);
}
