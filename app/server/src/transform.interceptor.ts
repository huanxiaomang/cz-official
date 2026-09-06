import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'code' in data && 'result' in data) {
          return data;
        }

        const result =
          data && typeof data === 'object' && 'data' in data
            ? data.data
            : data;

        const meta =
          data && typeof data === 'object' && 'meta' in data
            ? data.meta
            : undefined;

        return {
          code: 0,
          messages: 'success',
          result,
          ...(meta ? { meta } : {}),
        };
      }),
    );
  }
}
