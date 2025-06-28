import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    console.log('ErrorHandlingInterceptor: Request started');

    // await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay

    return next.handle().pipe(
      catchError((error: { name?: string; message?: string }) => {
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }

          return new BadRequestException(`Unknown Error`);
        });
      }),
    );
  }
}
