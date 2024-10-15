import { BadRequestException, ArgumentMetadata, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value
    }
    for (const key in value) {
      if (value[key]&&typeof value[key]==='string'&&/^[+-]?\d+(\.\d+)?$/.test(value[key])) {
        value[key]=Number(value[key])
      }
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
