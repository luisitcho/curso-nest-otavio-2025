import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('AddHeaderInterceptor: Adding custom header');
    const respose = context.switchToHttp().getResponse();
    respose.setHeader('X-Content-Type-Custom', 'application/json');
    return next.handle();
  }
}
