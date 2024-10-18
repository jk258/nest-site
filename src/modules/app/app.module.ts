import { Module } from '@nestjs/common'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/modules/auth/auth.module'
import { TagModule } from '@/modules/tag/tag.module'
import { SiteModule } from '@/modules/site/site.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../../', 'static'),
		}),
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		AuthModule,
		TagModule,
		SiteModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
	],
})
export class AppModule {}
