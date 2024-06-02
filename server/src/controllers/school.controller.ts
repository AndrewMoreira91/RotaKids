import prisma from "../lib/prima"
import { ChildProps } from "../types/child.type"

async function createScholl(data: ChildProps) {
	const child = await prisma.child.create({
		data,
	})
	return child
}

async function getScholls() {
	try {
		const schools = await prisma.school.findMany()
		return schools
	} catch (error) {
		console.log(error)
		return error
	}
}

export const schollController = {
	createScholl,
	getScholls
}