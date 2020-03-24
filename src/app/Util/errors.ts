import { HttpErrorResponse } from '@angular/common/http';
import { SanitizedError } from './sanitizedError';

export class Errors {
    public static sanitiseError(error: Error | HttpErrorResponse): SanitizedError {

        const sanitisedError: SanitizedError = {
            message: error.message,
            details: []
        };

        if (error instanceof Error) {
            sanitisedError.details.push(error.stack);
        } else if (error instanceof HttpErrorResponse) {

            sanitisedError.details = Object.keys(error).map((key: string) => `${key}: ${error[key]}`);


            if (error.error && error.error.success === false) {
                sanitisedError.message = error.error.errors.map((key: any) => ` ${key.key ? key.key + ' : ' : ''} ${key.message} `)
            } else {
                sanitisedError.message = 'Algo não está correto com a comunicação entre a aplicação e o servidor';
            }

        } else {
            sanitisedError.message = 'Algo não está correto. Por favor tente novamente';
            sanitisedError.details.push(JSON.stringify(error));
        }
        return sanitisedError;
    }
}