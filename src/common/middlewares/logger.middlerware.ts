import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl, body, query, params, ip } = req

		// 记录日志
		this.logger.info('router', {
			req: {
				method,
				url: originalUrl,
				body,
				query,
				params,
				ip,
			},
		})

		next()
	}
}
