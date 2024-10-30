import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTagDto, IdTagDto, UpdateTagDto } from './dto/tag.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { ResUserDto } from '@/modules/user/dto/user.dto'
import { UserRole } from '@/types/enmus'

@Injectable()
export class TagService {
	constructor(private prisma: PrismaService) {}
	async create(user: ResUserDto, createTagDto: CreateTagDto) {
		try {
			if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
			const tag = await this.prisma.tag.findFirst({
				where: {
					title: createTagDto.title,
				},
			})
			if (tag) {
				throw new BadRequestException(createTagDto.title + '已存在')
			} else {
				return await this.prisma.tag.create({
					data: {
						...createTagDto,
					},
				})
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async findAll() {
		return await this.prisma.tag.findMany({
			select: {
				id: true,
				title: true,
			},
		})
	}

	async update(user: ResUserDto, updateTagDto: UpdateTagDto) {
    try {
      if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
			return await this.prisma.tag.update({
				where: {
					id: updateTagDto.id,
				},
				data: {
					title: updateTagDto.title,
				},
			})
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async remove(user:ResUserDto,idDto: IdTagDto) {
    try {
      if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
			const tag = await this.prisma.tag.findFirst({
				where: {
					id: idDto.id,
				},
				include: {
					sites: true,
				},
			})
			if (tag) {
				await this.prisma.tagSite.deleteMany({
					where: {
						tagId: idDto.id,
					},
				})
			} else {
				throw new BadRequestException(idDto.id + '不存在')
			}
			return await this.prisma.tag.delete({
				where: {
					id: idDto.id,
				},
			})
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
}
