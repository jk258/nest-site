import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSiteDto, UpdateSiteDto, IdDto } from './dto/site.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { HttpService } from '@nestjs/axios'
import * as cheerio from 'cheerio'

@Injectable()
export class SiteService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly httpService: HttpService,
	) {}
	async create(createSiteDto: CreateSiteDto) {
		try {
			const tags = createSiteDto.tags.split(',').map((tag) => {
				return {
					tagId: Number(tag),
				}
			})
			const site = await this.prisma.site.findFirst({
				where: {
					title: createSiteDto.title,
				},
			})
			if (site) {
				throw new BadRequestException(createSiteDto.title + '已存在')
			} else {
				return await this.prisma.site.create({
					data: {
						...createSiteDto,
						tags: {
							create: tags,
						},
					},
				})
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async findAll() {
		try {
			const siteList = await this.prisma.site.findMany({
				include: {
					tags: {
						select: {
							tag: {
								select: {
									id: true,
									title: true,
								},
							},
						},
					},
				},
			})
			return siteList.map((site) => {
				return {
					...site,
					tags: site.tags.map((tag) => tag.tag),
				}
			})
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
	async getSiteDetail(idDto: IdDto) {
		try {
			const site = await this.prisma.site.findFirst({
				where: {
					id: idDto.id,
				},
				include: {
					tags: {
						select: {
							tag: {
								select: {
									id: true,
									title: true,
								},
							},
						},
					},
				},
      })
      return {
        ...site,
        tags: site.tags.map((tag) => tag.tag),
      }
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async update(siteDto: UpdateSiteDto) {
		try {
			const tags = siteDto.tags.split(',').map((tag) => {
				return {
					tagId: Number(tag),
				}
			})
			return await this.prisma.site.update({
				where: {
					id: siteDto.id,
				},
				data: {
					title: siteDto.title,
					url: siteDto.url,
					logo: siteDto.logo,
					tags: {
						deleteMany: {},
						create: tags,
					},
				},
			})
		} catch (error) {
			throw new BadRequestException(error)
		}
	}

	async remove(idDto: IdDto) {
		try {
			const site = await this.prisma.site.findFirst({
				where: {
					id: idDto.id,
				},
				include: {
					tags: true,
				},
			})
			if (site) {
				await this.prisma.tagSite.deleteMany({
					where: {
						siteId: idDto.id,
					},
				})
			} else {
				throw new BadRequestException(idDto.id + '不存在')
			}
			return await this.prisma.site.delete({
				where: {
					id: idDto.id,
				},
			})
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
	isValidUrl(str: string) {
		const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
		return urlRegex.test(str)
	}

	async getSiteInfo(url: string) {
		try {
			const res = await this.httpService.axiosRef.get(url)
			const $ = cheerio.load(res.data)
			const title = $('title').text()
			const desc = $('meta[name="description"]').attr('content')
			let logo = $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href')
			if (logo && !this.isValidUrl(logo)) {
				logo = url + logo
			}
			return { title, desc, logo }
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
}
