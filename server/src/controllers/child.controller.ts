import { Prisma } from "@prisma/client"
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

async function getChildById(id: string, select?: Prisma.ChildSelect) {
	if (select === undefined) {
		select = {
			id: true,
			name: true,
			birthDate: true,
			address: true,
			latitude: true,
			longitude: true,
			guardianId: true,
			schoolId: true,
		}
	}
	const child = await prisma.child.findUnique({
		where: {
			id
		},
		select
	})
	return child
}

async function getChilds(select?: Prisma.ChildSelect) {
	try {
		if (select === undefined) {
			select = {
				id: true,
				name: true,
				birthDate: true,
				address: true,
				latitude: true,
				longitude: true,
				guardianId: true,
			}
		}
		const childs = await prisma.child.findMany({
			select
		})
		return childs
	} catch (error) {
		console.error(error)
		return error
	}
}

async function getChildsByParams(params: Prisma.ChildWhereInput, select?: Prisma.ChildSelect) {
	try {
		if (select === undefined) {
			select = {
				id: true,
				name: true,
				birthDate: true,
				address: true,
				latitude: true,
				longitude: true,
				guardianId: true,
			}
		}
		const childs = await prisma.child.findMany({
			where: params,
			select
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
	getChildById,
	getChildsByParams
}