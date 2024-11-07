import { UpdateTagDto } from "@/modules/tag/dto/tag.dto"
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator"

export class CreateSiteDto {
	@ApiProperty({ description: '网站标题', example: '百度' })
	@IsNotEmpty({ message: '标题不能为空' })
	title: string

	@ApiProperty({ description: '网址', example: 'https://www.baidu.com' })
	@IsNotEmpty({ message: 'url不能为空' })
	@IsUrl({}, { message: 'url格式不正确' })
	url: string

	@ApiProperty({ description: 'logo', example: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' })
	@IsNotEmpty({ message: 'logo不能为空' })
	logo: string

	@ApiProperty({ description: '网站简介', example: '百度知道' })
	desc?: string

	@ApiProperty({ description: '标签，以“,”号隔开', example: '技术,前端' })
	tags?: string
}

export class UpdateSiteDto extends CreateSiteDto {
	@ApiProperty({ description: '网站id', example: '1' })
	@IsNotEmpty({ message: 'id不能为空' })
	@IsNumber({}, { message: 'id必须为数字' })
	id: number
}

export class IdDto extends PickType(UpdateSiteDto, ['id']) {
	
}
export class ResSiteDto extends OmitType(UpdateSiteDto, ['tags']) {
  tags: UpdateTagDto[]
}

export class SiteUrl extends PickType(UpdateSiteDto, ['url']) {
	
}

export class SiteSearchDto{
  title:string
  tagId: number
}
