import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const respose = context.switchToHttp().getResponse();
    respose.setHeader('X-Content-Type-Custom', 'application/json');
    return next.handle();
  }
}
