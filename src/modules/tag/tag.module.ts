import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		PrismaModule,
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
	controllers: [TagController],
	providers: [TagService],
})
export class TagModule {}
