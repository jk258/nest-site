import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createWriteStream } from 'fs'
import { join } from 'path'

@Injectable()
export class UploadService {
	constructor(private readonly config: ConfigService) {}
  async saveFile(file: Express.Multer.File) {
    const uploadPath = `/upload/${+new Date() + file.mimetype.replace('image/', '.')}`
		await createWriteStream(join(__dirname, '../../../static', uploadPath)).end(file.buffer)
		return this.config.get<string>('SITE_DOMAIN')+uploadPath
	}
}
