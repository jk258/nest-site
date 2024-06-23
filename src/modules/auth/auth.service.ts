import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private prisma: PrismaService,
	) {}

  async signIn(username: string, pass: string): Promise<any> {
    let user =await this.prisma.user.findUnique({ where: { email: username } })
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: username,
          password: pass
        }
      })
    }    
		// const user = await this.usersService.findOne(username)
		if (user?.password !== pass) {
			throw new BadRequestException('用户名或密码错误')
		}
		const payload = { userId: user.id, username: user.email }
		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
