import prisma from "../lib/prima"
import { ChildProps } from "../types/child.type"

async function createChild(data: ChildProps) {
	const child = await prisma.child.create({
		data,
		select: {
			id: true,
			name: true,
			birthDate: true,
			address: true,
			latitude: true,
			longitude: true,
			guardianId: true,
			schoolId: true
		}
	})
	return child
}

async function getChildById(id: string) {
	const child = await prisma.child.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			birthDate: true,
			address: true,
			latitude: true,
			longitude: true,
			guardianId: true
		}
	})
	return child
}

async function getChildrenByGuardianId(guardianId: string) {
	const children = await prisma.child.findMany({
		where: {
			guardianId
		},
		select: {
			id: true,
			name: true,
			birthDate: true,
			address: true,
			latitude: true,
			longitude: true,
			guardianId: true
		}
	})
	return children
}

async function getChilds() {
	try {
		const childs = await prisma.child.findMany({
			select: {
				id: true,
				name: true,
				birthDate: true,
				address: true,
				latitude: true,
				longitude: true,
				guardianId: true
			}
		})
		return childs
	} catch (error) {
		console.error(error)
		return error
	}
}

export const childController = {
	createChild,
	getChilds,
}