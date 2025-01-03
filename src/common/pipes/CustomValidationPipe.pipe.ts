import { BadRequestException, ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value
    }
		const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]
			throw new BadRequestException(msg)
		}
		return value
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype)
	}
}
