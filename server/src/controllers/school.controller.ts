import prisma from "../lib/prima"
import { ChildProps } from "../types/child.type"

async function createScholl(data: ChildProps) {
	const child = await prisma.child.create({
		data,
	})
	return child
}

export const schollController = {
	createChild: createScholl
}