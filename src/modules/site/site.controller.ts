import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto, IdDto, SiteUrl, UpdateSiteDto } from './dto/site.dto'

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
  @Get('detail')
	async getSiteDetail(@Query() query: IdDto) {
		return await this.siteService.getSiteDetail(query)
	}

	@Post('update')
	async update(@Body() updateSiteDto: UpdateSiteDto) {
		return await this.siteService.update(updateSiteDto)
	}

	@Post('delete')
	async remove(@Body() idDto: IdDto) {
		return await this.siteService.remove(idDto)
	}
	@Get('info')
	async getSiteInfo(@Query() query: SiteUrl) {
		return await this.siteService.getSiteInfo(query.url)
	}
}
