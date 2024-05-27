import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.findMany({
		include: {
			tasks: true
		}
	})
	console.dir(user, { depth: null })
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