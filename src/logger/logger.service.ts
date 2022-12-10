import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
    setContext(context: string) {
        super.setContext(context);
    }
}