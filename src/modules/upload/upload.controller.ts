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

@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

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
