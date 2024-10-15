import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto,IdTagDto,UpdateTagDto } from './dto/tag.dto'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

  @Post('create')
  @HttpCode(200)
	async create(@Body() createTagDto: CreateTagDto) {
		return await this.tagService.create(createTagDto)
	}

	@Get('list')
	async findAll() {
		return await this.tagService.findAll()
	}

	@Post('update')
	async update(@Body() updateTagDto: UpdateTagDto) {
		return await this.tagService.update(updateTagDto)
	}

	@Post('delete')
	async remove(@Body() idDto:IdTagDto) {
		return await this.tagService.remove(idDto)
	}
}
