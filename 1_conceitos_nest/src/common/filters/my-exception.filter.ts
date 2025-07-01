import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<import('express').Response>();
    const request = context.getRequest<import('express').Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      date: new Date().toISOString(),
      path: request.url,
    });
  }
}
