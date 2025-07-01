import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse<import('express').Response>();
    const request = context.getRequest<import('express').Request>();

    const status = exception.getStatus ? exception.getStatus() : 400;
    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : { message: 'Error', status };

    response.status(status).json({
      ...exceptionResponse,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
