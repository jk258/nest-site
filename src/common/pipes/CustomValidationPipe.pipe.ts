import { ValidationPipe, ArgumentMetadata } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common';
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      // 这里可以自定义错误处理，例如将错误信息转换为更友好的格式
      throw new BadRequestException(error.response.message[0], error.constraints)
    }
  }
}
