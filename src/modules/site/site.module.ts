import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [PrismaModule, HttpModule],
	controllers: [SiteController],
	providers: [SiteService],
})
export class SiteModule {}
