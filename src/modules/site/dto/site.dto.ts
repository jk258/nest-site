import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateSiteDto {
	@IsNotEmpty({ message: '标题不能为空' })
	title: string
	@IsNotEmpty({ message: '地址不能为空' })
	url: string
	@IsNotEmpty({ message: 'logo不能为空' })
  logo: string
  
  tags: { tagId: number }[]
  
}
export class IdDto {
	@IsNotEmpty({ message: 'id不能为空' })
	@IsNumber({}, { message: 'id必须为数字' })
	id: number
}
export class UpdateSiteDto extends CreateSiteDto {
	@IsNotEmpty({ message: 'id不能为空' })
	@IsNumber({}, { message: 'id必须为数字' })
	id: number
}
