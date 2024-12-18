import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		PrismaModule,
		HttpModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get<string>('AUTH_SECRET'),
					global: true,
					signOptions: { expiresIn: '60s' },
				}
			},
			inject: [ConfigService],
		}),
	],
	controllers: [SiteController],
	providers: [SiteService],
})
export class SiteModule {}
