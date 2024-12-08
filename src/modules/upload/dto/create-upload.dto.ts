import { ApiProperty } from "@nestjs/swagger";

export class CreateUploadDto {
	@ApiProperty({ type: 'string', format: 'binary', description:"图片文件"})
	file: Express.Multer.File
}
