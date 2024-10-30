import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto, ResUserDto, UpdateUserDto } from './dto/user.dto'
import { UserRole } from '@/types/enmus'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async create(user: ResUserDto, userDto: CreateUserDto) {
		try {
			if (user.role !== UserRole.admin) {
				throw new BadRequestException('权限不足')
			} else {
				let userNew = await this.prisma.user.findFirst({ where: { username: user.username } })
				if (userNew) {
					throw new BadGatewayException('用户已存在')
				} else {
					return await this.prisma.user.create({
						data: {
							username: userDto.username,
							password: userDto.password,
							role: userDto.role,
						},
						select: {
							id: true,
							username: true,
							role: true,
						},
					})
				}
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async findList(user: ResUserDto) {
		try {
			if (user.role !== UserRole.admin) {
				throw new BadRequestException('权限不足')
			} else {
				return await this.prisma.user.findMany({
					where: { role: { lt: user.role } },
					select: {
						id: true,
						username: true,
						role: true,
					},
				})
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async update(user: ResUserDto, userDto: UpdateUserDto) {
		try {
			if (user.role !== UserRole.admin) {
				throw new BadRequestException('权限不足')
			} else {
				return await this.prisma.user.update({
					where: { id: userDto.id },
					data: {
						username: userDto.username,
						role: userDto.role,
					},
					select: {
						id: true,
						username: true,
						role: true,
					},
				})
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
  remove(user: ResUserDto, id: number) {
		try {
			if (user.role !== UserRole.admin) {
				throw new BadRequestException('权限不足')
			} else {
				return this.prisma.user.delete({
					where: { id: id },
					select: {
						id: true,
						username: true,
						role: true,
					},
				})
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
}
