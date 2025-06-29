import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const startTime = Date.now();
    // console.log('TimingConnectionInterceptor: Request started');

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay
    return next.handle().pipe(
      tap((data) => {
        const finalTime = Date.now();
        const elapsed = finalTime - startTime;

        console.log(
          `TimingConnectionInterceptor: Request completed in ${elapsed}ms`,
        );

        // console.log(data);
      }),
    );
  }
}
