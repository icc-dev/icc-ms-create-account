import { ConfigService } from '@nestjs/config';
import { app } from '../main';


export function getDate() {
    const configService = app.get(ConfigService);
    const date = new Date().toLocaleString('es-ES', {
        timeZone: configService.get<string>('application.timeZone'),
    });
    const [dateComponents, timeComponents] = date.split(',');
    const [month, day, year] = dateComponents.split('/');
    const [hours, minutes, seconds] = timeComponents.split(':');

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
}
