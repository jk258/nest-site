import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto, IdDto, ResSiteDto, SiteSearchDto, SiteUrl, UpdateSiteDto } from './dto/site.dto'
import { Public } from '@/common/decorators/index.decorator'
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/modules/auth/auth.guard';

@ApiTags('网站')
@Controller('site')
export class SiteController {
	constructor(private readonly siteService: SiteService) {}

	@ApiOperation({ summary: '添加网址' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateSiteDto,
		description: '网站信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('create')
	async create(@Request() req,@Body() createSiteDto: CreateSiteDto) {
		return await this.siteService.create(req.user,createSiteDto)
	}

	@ApiOperation({ summary: '获取网站列表' })
	@ApiResponse({
		status: 200,
		type: [ResSiteDto],
		description: '网站信息',
	})
	@HttpCode(HttpStatus.OK)
	@Get('list')
	@Public()
	async findAll(@Query() query: SiteSearchDto) {
		return await this.siteService.findAll(query)
	}

	@ApiOperation({ summary: '获取网站详情' })
	@ApiResponse({
		status: 200,
		type: UpdateSiteDto,
		description: '网站信息',
	})
	@HttpCode(HttpStatus.OK)
	@Get('detail')
	@Public()
	async getSiteDetail(@Query() query: IdDto) {
		return await this.siteService.getSiteDetail(query)
	}

	@ApiOperation({ summary: '修改网站' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateSiteDto,
		description: '网站信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('update')
	async update(@Request() req,@Body() updateSiteDto: UpdateSiteDto) {
		return await this.siteService.update(req.user,updateSiteDto)
	}

	@ApiOperation({ summary: '删除网站' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateSiteDto,
		description: '网站信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('delete')
	async remove(@Request() req,@Body() idDto: IdDto) {
		return await this.siteService.remove(req.user,idDto)
	}
	@ApiOperation({ summary: '根据网址获取网站信息' })
	@ApiResponse({
		status: 200,
		type: CreateSiteDto,
		description: '网站信息',
	})
	@HttpCode(HttpStatus.OK)
	@Public()
	@Get('info')
	async getSiteInfo(@Query() query: SiteUrl) {
		return await this.siteService.getSiteInfo(query.url)
	}
}
