## 目录
```
src
├──common 公共文件
├──config 配置
├──modules 模块
├──main.ts 入口
```
## 配置前缀
在`main.ts`中配置如下
```TypeScript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');//全局给接口配置api前缀
  await app.listen(3000);
}
```
## 静态服务
安装包`@nestjs/serve-static`
```bash
npm install --save @nestjs/serve-static
```
将`ServeStaticModule` 导入根 `AppModule`，并通过将配置对象传递给 forRoot() 方法来配置它
```TypeScript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
## 日志

安装winston

```
npm i nest-winston winston winston-daily-rotate-file
```

在app.module.ts注册nest-winston模块

```ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import type { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'
import 'winston-daily-rotate-file'

const NODE_ENV = process.env.NODE_ENV

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: NODE_ENV === 'development' ? '.env.development' : `.env.${NODE_ENV}`,
		}),
		WinstonModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				// 日志输出的管道
				const transportsList: WinstonModuleOptions['transports'] = [
					new transports.DailyRotateFile({
						level: 'error',
						dirname: `logs`,
						filename: `%DATE%-error.log`,
						datePattern: 'YYYY-MM-DD',
						maxSize: '20m',
					}),
					new transports.DailyRotateFile({
						dirname: `logs`,
						filename: `%DATE%-combined.log`,
						datePattern: 'YYYY-MM-DD',
						maxSize: '20m',
						format: format.combine(
							format((info) => {
								if (info.level === 'error') {
									return false // 过滤掉'error'级别的日志
								}
								return info
							})(),
						),
					}),
				]
				// 开发环境下，输出到控制台
				if (configService.get('NODE_ENV') === 'development') {
					transportsList.push(new transports.Console())
				}

				return {
					transports: transportsList,
				}
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
```

ps:Winston的日志level等级的定义：

```ts
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
	silly: 6,
}
```

### 请求中间件

```ts
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
```

去`app.module.ts`激活

```ts
export class AppModule {
	// 全局中间件
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
```

### 响应日志

```ts
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
```

### 错误日志记录

我们找到全局的错误过滤器：http-exception.filter.ts

```ts
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
```

在`app.module.ts`中注册

```ts
import { Module } from '@nestjs/common'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { HttpExceptionsFilter } from '@/common/filters/http-exception.filter'

@Module({
	imports: [],
	controllers: [],
	providers: [
		{
			provide: 'APP_INTERCEPTOR',
			useClass: TransformInterceptor,
		},
		{
			provide: 'APP_FILTER',
			useClass: HttpExceptionsFilter,
		},
	],
})
export class AppModule {}
```

