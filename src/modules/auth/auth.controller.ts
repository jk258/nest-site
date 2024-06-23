import { Controller, HttpStatus, Post,HttpCode, Request, UseGuards, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Public } from '@/common/decorators/index.decorator'
import { AuthDto, LoginResponse } from './dto/auth.dto'
import {  ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'



@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
    description: '返回登录信息'
  })
	@HttpCode(HttpStatus.OK)
	@Post('login')
	@Public()
	signIn(@Body() signInDto: AuthDto) {
		return this.authService.signIn(signInDto.username, signInDto.password)
	}

	@ApiOperation({ summary: '获取用户信息' })
	@ApiHeader({
		name: 'authorization',
		description: '用户token',
		example: 'Bearer token',
		required: true,
	})
	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}
}
