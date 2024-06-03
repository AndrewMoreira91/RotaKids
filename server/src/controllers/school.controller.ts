import { Prisma } from "@prisma/client"
import prisma from "../lib/prima"
import { SchoolProps } from "../types/school.type"

async function createScholl(data: SchoolProps) {
	try {
		const school = await prisma.school.create({
			data,
		})
		return school
	} catch (error) {
		console.log(error)
		return error
	}
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

async function getSchollByParams(params: Prisma.SchoolWhereUniqueInput) {
	try {
		console.log(params)
		const school = await prisma.school.findMany({
			where: params,
			select: {
				id: true,
				name: true,
				address: true,
				latitude: true,
				longitude: true,
			}
		})
		return school
	} catch (error) {
		console.log(error)
		return error
	}
}

export const schollController = {
	createScholl,
	getScholls,
	getSchollByParams
}