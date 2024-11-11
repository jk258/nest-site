import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private prisma: PrismaService,
	) {}

	async signIn(username: string, password: string): Promise<any> {
		try {
			let user = await this.prisma.user.findFirst({ where: { username: username } })
      
			if (user?.password != password) {
				throw new BadRequestException('用户名或密码错误')
			}
			const payload = { userId: user.id, username: user.username, role: user.role }
			return {
				access_token: await this.jwtService.signAsync(payload),
			}
		} catch (error) {
			throw new BadRequestException(error)
		}
	}
}
