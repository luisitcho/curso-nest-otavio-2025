import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    console.log('TimingConnectionInterceptor: Request started');

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay
    return next.handle();
  }
}
