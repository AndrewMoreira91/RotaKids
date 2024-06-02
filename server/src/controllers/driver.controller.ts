import prisma from "../lib/prima"
import { DriverProps } from "../types/user.type"
import { Prisma } from "@prisma/client"

async function createDriver(data: DriverProps) {
	const driver = await prisma.driver.create({
		data,
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: true,
		}
	})
	return driver
}

async function getDrives() {
	const drives = await prisma.driver.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: true,
		}
	})
	return drives
}

async function getDriverById(id: string) {
	const driver = await prisma.driver.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			cpf: true,
		}
	})
	if (driver !== null) {
		return driver
	} else {
		return "Motorista não encontrado"
	}
}

async function updateDriver(id: string, data: DriverProps) {
	try {
		const driver = await prisma.driver.update({
			where: {
				id
			},
			data,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				phone: true,
				password: true,
				cpf: true,
			}
		})
		if (driver === null) {
			return "Motorista não encontrado"
		}
		return driver
	} catch (error) {
		return "Erro ao atualizar motorista"
	}
}

async function deleteDriver(id: string) {
	try {
		const driver = await prisma.driver.delete({
			where: {
				id
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				phone: true,
			}
		})
		if (driver === null) {
			return "Motorista não encontrado"
		}
		return driver
	} catch (error) {
		return "Erro ao deletar motorista"
	}
}

async function getDriverByParams(params: Prisma.DriverWhereUniqueInput) {
	try {
		const driver = await prisma.driver.findMany({
			where: params,
			select: {
				id: true,
				firstName: true,
				lastName: true,
			}
		})
		if (driver !== null) {
			return driver
		} else {
			return null
		}
	} catch (error) {
		return "Erro ao buscar motorista"
	}
}


export const driverController = {
	createDriver,
	getDrives,
	getDriverById,
	updateDriver,
	deleteDriver,
	getDriverByParams,
}