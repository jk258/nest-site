import { MiddlewareConsumer, Module } from '@nestjs/common'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import type { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'
import 'winston-daily-rotate-file'
import { AuthModule } from '@/modules/auth/auth.module'
import { TagModule } from '@/modules/tag/tag.module'
import { SiteModule } from '@/modules/site/site.module'
import { UserModule } from '@/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { LoggerMiddleware } from '@/common/middlewares/logger.middlerware'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { HttpExceptionsFilter } from '@/common/filters/http-exception.filter'


@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../../', 'static'),
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
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
		AuthModule,
		TagModule,
		SiteModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
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
export class AppModule {
	// 全局中间件
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
