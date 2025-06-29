import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // console.log('SimpleCacheInterceptor: Request started');
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      // console.log('SimpleCacheInterceptor: Returning cached response', url);
      return of(this.cache.get(url));
    }

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating a delay

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log('SimpleCacheInterceptor: Caching response', url);
      }),
    );
  }
}
