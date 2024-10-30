import { Module } from '@nestjs/common'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from '@/modules/auth/auth.module'
import { TagModule } from '@/modules/tag/tag.module'
import { SiteModule } from '@/modules/site/site.module'
import { UserModule } from '@/modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'

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
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
