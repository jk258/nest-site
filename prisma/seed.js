const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const userList = await prisma.user.findMany()
  if (userList.length > 0) {
		return
	}
	const user = await prisma.user.create({
		data: {
			username: 'admin',
			password: '123456',
		},
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
