import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { count } from 'console';
import { map, Observable } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    console.log('ChangeDataInterceptor: Request started');

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length,
          };
        }

        return data;
      }),
    );
  }
}
