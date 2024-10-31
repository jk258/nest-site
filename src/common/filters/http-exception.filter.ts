import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common'
import type { Response, Request } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const code = response.statusCode
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
		const message = exception instanceof HttpException ? exception.message : exception

		const { method, originalUrl, body, query, params, ip } = request
		this.logger.error('HttpException', {
			res: {
				code,
				status,
				message: message,
			},
			req: {
				method,
				url: originalUrl,
				body,
				query,
				params,
				ip,
			},
		})
		response.status(status).json({
			code: status,
			message: message,
		})
	}
}
