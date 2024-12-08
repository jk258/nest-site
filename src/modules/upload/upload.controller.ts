import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	FileTypeValidator,
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { CreateUploadDto } from './dto/create-upload.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Public } from '@/common/decorators/index.decorator'
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('上传')
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@ApiOperation({ summary: '上传图片' })
	@ApiConsumes('multipart/form-data')
	@ApiResponse({
		status: 200,
		type: String,
		description: '网站信息',
	})
	@ApiBody({
		type: CreateUploadDto,
	})
	@Post('image')
	@HttpCode(HttpStatus.OK)
	@Public()
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 10240, message: '最大不能超过10k' }), new FileTypeValidator({ fileType: 'image/*' })],
			}),
		)
		file: Express.Multer.File,
	) {
		return await this.uploadService.saveFile(file)
	}
}
