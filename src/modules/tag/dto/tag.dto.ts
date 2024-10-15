import { PartialType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, isNumber, IsNumber } from 'class-validator'

export class CreateTagDto {
	@IsNotEmpty({ message: 'title不能为空' })
	title: string
}
export class IdTagDto {
	@IsNotEmpty({ message: 'id不能为空' })
	@IsNumber({}, { message: 'id必须为数字' })
	id: number
}
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNotEmpty({ message: 'id不能为空' })
  @IsNumber({},{message:'id必须为数字'})
	id: number
}
