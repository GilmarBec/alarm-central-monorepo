import { Request, Response } from 'express';
import { ErrorResponse } from '../exceptions/error.response';
import Logger from '../helpers/logger';

type MethodControllerArguments = (req: Request, res: Response) => any;

export function ControllerExceptionHandler() {
    return (
        target: any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<MethodControllerArguments>,
    ) => {
        const originalMethod = descriptor.value!;

        descriptor.value = async function (request, response) {
            const resource = request.params.id || request.params.code || '';

            Logger.info(
                `Received request to ${propertyName}: ${resource}`,
                request.body,
            );

            try {
                await originalMethod.bind(this)(request, response);
            } catch (exception: ErrorResponse | Error | any) {
                Logger.error(`${propertyName} failed.`, {
                    exception: {...exception},
                    baseUrl: request.baseUrl,
                    body: request.body,
                    params: request.params,
                    headers: request.headers,
                });

                if (exception instanceof ErrorResponse) {
                    return response.status(exception.status).json({
                        code: exception.errorCode,
                        message: exception.message,
                        details: exception.details,
                    });
                }

                return response.status(ErrorResponse.GENERIC_ERROR.status).json({
                    code: ErrorResponse.GENERIC_ERROR.errorCode,
                    message: ErrorResponse.GENERIC_ERROR.message,
                    details: exception,
                });
            }

            return descriptor;
        };
    };
}
