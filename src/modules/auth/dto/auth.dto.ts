import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDto {
	@ApiProperty({ description: '用户名', example: '123@123.com' })
	@IsEmail({}, { message: '请输入正确的邮箱' })
	username: string

	@ApiProperty({ description: '密码', example: 'guess' })
	@IsNotEmpty({ message: '请输入密码' })
	password: string
}


export class LoginResponse {
  @ApiProperty({ description: '用户token' })
  access_token: string
}
