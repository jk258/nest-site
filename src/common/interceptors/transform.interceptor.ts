import { CallHandler, ExecutionContext, NestInterceptor, Injectable, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				const result = {
					data: data, 
					message: '成功', 
					code: 200,
        }
				return result
			}),
		)
	}
}
