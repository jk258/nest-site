import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, HttpCode, UseGuards, HttpStatus, Request } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto, IdTagDto, UpdateTagDto } from './dto/tag.dto'
import { Public } from '@/common/decorators/index.decorator'
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@/modules/auth/auth.guard'

@ApiTags('标签')
@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}
	@ApiOperation({ summary: '创建标签' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateTagDto,
		description: '标签信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('create')
	async create(@Request() req, @Body() createTagDto: CreateTagDto) {
		return await this.tagService.create(req.user, createTagDto)
	}

	@ApiOperation({ summary: '标签列表' })
	@ApiResponse({
		status: 200,
		type: [UpdateTagDto],
		description: '标签列表',
	})
	@HttpCode(HttpStatus.OK)
	@Get('list')
	@Public()
	async findAll() {
		return await this.tagService.findAll()
	}

	@ApiOperation({ summary: '修改标签' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateTagDto,
		description: '标签信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('update')
	async update(@Request() req, @Body() updateTagDto: UpdateTagDto) {
		return await this.tagService.update(req.user, updateTagDto)
	}

	@ApiOperation({ summary: '删除标签' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: UpdateTagDto,
		description: '标签信息',
	})
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('delete')
	async remove(@Request() req, @Body() idDto: IdTagDto) {
		return await this.tagService.remove(req.user,idDto)
	}
}
