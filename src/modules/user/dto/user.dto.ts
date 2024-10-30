import { ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
	@ApiProperty({ description: '用户名', example: '123@123.com' })
	@IsNotEmpty({ message: '用户名不能为空' })
	username: string

	@ApiProperty({ description: '密码', example: 'guess' })
	password: string

	@ApiProperty({ description: '权限', example: '0' })
	role: number
}
export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ description: '用户id', example: '1' })
  @IsNotEmpty({message: '用户id不能为空'})
  id: number
}

export class IdDto extends PickType(UpdateUserDto, ['id']) {
  
}
export class ResUserDto extends OmitType(UpdateUserDto,['password']) {
  
}
