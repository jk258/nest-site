import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, isNumber, IsNumber } from 'class-validator'

export class CreateTagDto {
	@ApiProperty({ description: '标签名称', example: '技术' })
	@IsNotEmpty({ message: 'title不能为空' })
	title: string
}

export class UpdateTagDto extends CreateTagDto {
	@ApiProperty({ description: '标签id', example: '1' })
	@IsNotEmpty({ message: 'id不能为空' })
	@IsNumber({}, { message: 'id必须为数字' })
	id: number
}

export class IdTagDto extends PickType(UpdateTagDto,['id']) {
	
}
