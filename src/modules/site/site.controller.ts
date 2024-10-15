import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto, IdDto, UpdateSiteDto } from './dto/site.dto'

@Controller('site')
export class SiteController {
	constructor(private readonly siteService: SiteService) {}

	@Post('create')
	async create(@Body() createSiteDto: CreateSiteDto) {
		return await this.siteService.create(createSiteDto)
	}

	@Get('list')
	async findAll() {
		return await this.siteService.findAll()
	}

	@Post('update')
	update(@Body() updateSiteDto: UpdateSiteDto) {
		return this.siteService.update(updateSiteDto)
	}

	@Post('delete')
	remove(@Body() idDto: IdDto) {
		return this.siteService.remove(idDto)
	}
}
