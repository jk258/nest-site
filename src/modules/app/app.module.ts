import { Module } from '@nestjs/common'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/modules/auth/auth.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../../', 'client'),
		}),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
