import prisma from "../lib/prima"
import { GuardianProps } from "../types/user.type"
import { Prisma } from "@prisma/client"

async function createGuardian(data: GuardianProps) {
	const guardian = await prisma.guardian.create({
		data,
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: true,
			driverId: true
		}
	})
	return guardian
}

async function getGuardians() {
	const guardians = await prisma.guardian.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: true,
			driverId: true,
			_count: {
				select: {
					childs: true
				}
			}
		}
	})
	return guardians
}

async function getGuardianById(id: string) {
	const guardian = await prisma.guardian.findUnique({
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
			driverId: true,
			_count: {
				select: {
					childs: true
				}
			}
		}
	})
	if (guardian !== null) {
		return guardian
	} else {
		return "Responsável não encontrado"
	}
}

async function updateGuardian(id: string, data: GuardianProps) {
	try {
		const guardian = await prisma.guardian.update({
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
				driverId: true,
			}
		})
		if (guardian === null) {
			return "Responsável não encontrado"
		}
		return guardian
	} catch (error) {
		return "Erro ao atualizar responsável"
	}
}

async function deleteGuardian(id: string) {
	try {
		const guardian = await prisma.guardian.delete({
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
		if (guardian === null) {
			return "Responsável não encontrado"
		}
		return guardian
	} catch (error) {
		return "Erro ao deletar responsável"
	}
}

async function getGuardianByParams(params: Prisma.GuardianWhereUniqueInput) {
	try {
		const guardian = await prisma.guardian.findMany({
			where: params,
			select: {
				id: true,
				firstName: true,
				lastName: true,
			}
		})
		if (guardian !== null) {
			return guardian
		} else {
			return null
		}
	} catch (error) {
		return "Erro ao buscar responsável"
	}
}


export const guardianController = {
	createGuardian,
	getGuardians,
	getGuardianById,
	updateGuardian,
	deleteGuardian,
	getGuardianByParams,
}