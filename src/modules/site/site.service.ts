import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateSiteDto, UpdateSiteDto, IdDto, SiteSearchDto } from './dto/site.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { HttpService } from '@nestjs/axios'
import * as cheerio from 'cheerio'
import { ResUserDto } from '@/modules/user/dto/user.dto'
import { UserRole } from '@/types/enmus'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SiteService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly httpService: HttpService,
		private readonly config: ConfigService,
	) {}
	async create(user: ResUserDto, createSiteDto: CreateSiteDto) {
		try {
			if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
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
				createSiteDto.logo = createSiteDto.logo.replace(this.config.get<string>('SITE_DOMAIN'), '')
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

	async findAll(siteSearch: SiteSearchDto) {
		try {
			const whereData: {
				title?: { contains: string }
				tags?: {
					some: {
						tagId: number
					}
				}
			} = {}
			if (siteSearch.title) {
				whereData.title = {
					contains: siteSearch.title,
				}
			}
			if (siteSearch.tagId > 0) {
				whereData.tags = {
					some: {
						tagId: Number(siteSearch.tagId),
					},
				}
			}

			const siteList = await this.prisma.site.findMany({
				where: whereData,
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
					logo: site.logo ? this.config.get<string>('SITE_DOMAIN') + site.logo : site.logo,
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

	async update(user: ResUserDto, siteDto: UpdateSiteDto) {
		try {
			if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
			const tags = siteDto.tags.split(',').map((tag) => {
				return {
					tagId: Number(tag),
				}
			})
			siteDto.logo = siteDto.logo.replace(this.config.get<string>('SITE_DOMAIN'), '')
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

	async remove(user: ResUserDto, idDto: IdDto) {
		try {
			if (user.role > UserRole.user) {
				throw new BadRequestException('权限不足')
			}
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
			const res = await this.httpService.axiosRef.get(url, {
				headers: {
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
				},
			})
			const $ = cheerio.load(res.data)
			const title = $('title').text()
			const desc = $('meta[name="description"]').attr('content')
			let logo = $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href')
			if (logo) {
				if (!this.isValidUrl(logo)) {
					logo = url + logo
				}
				const resLogo = await this.httpService.axiosRef.get(logo, {
					responseType: 'arraybuffer',
				})
				const buffer = Buffer.from(resLogo.data)
				const logoPaths = logo.split('/')
				const logoName = String(+new Date()) + '-' + String(Math.random()).split('.')[1] + '-' + logoPaths[logoPaths.length - 1]
				writeFileSync(join(__dirname, '../../../static/upload/' + logoName), buffer)
				logo = this.config.get<string>('SITE_DOMAIN') + '/upload/' + logoName
			}

			return { title, desc, logo }
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
}
