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

export const schollController = {
	createScholl,
	getScholls
}