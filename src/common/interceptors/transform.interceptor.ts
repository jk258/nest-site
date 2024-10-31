import { CallHandler, ExecutionContext, NestInterceptor, Injectable, HttpStatus, Inject } from '@nestjs/common'
import type { Response, Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

/**
 * 拦截器，统一返回格式
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const code = response.statusCode
		const message = response.statusMessage
		return next.handle().pipe(
			map((data) => {
				let jsonData = { code: code, message: message || '成功', data: data ?? null }
				// 记录日志
				const { method, originalUrl, body, query, params, ip } = request
				this.logger.info('response', {
					req: {
						method,
						url: originalUrl,
						body,
						query,
						params,
						ip,
					},
					res: jsonData,
				})
				return jsonData
			}),
		)
	}
}
