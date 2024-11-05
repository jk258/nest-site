import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, IdDto, ResUserDto, UpdateUserDto } from './dto/user.dto'
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@/modules/auth/auth.guard'

@ApiTags('用户')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: '获取用户信息' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: ResUserDto,
		description: '用户信息',
	})
	@UseGuards(AuthGuard)
	@Get('info')
	getInfo(@Request() req) {
		return req.user
	}

	@ApiOperation({ summary: '新增用户' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: ResUserDto,
		description: '用户信息',
	})
	@HttpCode(HttpStatus.OK)
	@Post('create')
	@UseGuards(AuthGuard)
	async create(@Request() req, @Body() createUserDto: CreateUserDto) {
		return await this.userService.create(req.user, createUserDto)
	}

	@ApiOperation({ summary: '用户列表' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: [ResUserDto],
		description: '用户列表',
	})
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Get('list')
	async findList(@Request() req) {
		return await this.userService.findList(req.user)
	}

	@ApiOperation({ summary: '修改用户' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: ResUserDto,
		description: '用户信息',
	})
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('update')
	async update(@Request() req, @Body() userDto: UpdateUserDto) {
		return await this.userService.update(req.user, userDto)
	}

	@ApiOperation({ summary: '删除用户' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@ApiResponse({
		status: 200,
		type: ResUserDto,
		description: '用户信息',
	})
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@Post('delete')
	async remove(@Request() req, @Body() idDto: IdDto) {
		return await this.userService.remove(req.user, idDto.id)
	}
}
