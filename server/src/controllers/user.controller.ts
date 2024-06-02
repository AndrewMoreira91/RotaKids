import prisma from "../lib/prima"
import { UserProps } from "../types/user.type"
import { Prisma } from "@prisma/client"

async function createUser(data: UserProps) {
	const user = await prisma.user.create({
		data,
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			role: true,
			cpf: true,
		}
	})
	return user
}

async function getUsers() {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: true,
			role: true
		}
	})
	return users
}

async function getUserById(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
			password: false,
			cpf: false,
			role: true
		}
	})
	if (user !== null) {
		return user
	} else {
		return "Usuario não encontrado"
	}
}

async function updateUser(id: string, data: UserProps) {
	try {
		const user = await prisma.user.update({
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
				role: true,
			}
		})
		if (user === null) {
			return "Usuario não encontrado"
		}
		return user
	} catch (error) {
		return "Erro ao atualizar usuário"
	}
}

async function deleteUser(id: string) {
	try {
		const user = await prisma.user.delete({
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
		if (user === null) {
			return "Usuario não encontrado"
		}
		return user
	} catch (error) {
		return "Erro ao deletar usuário"
	}
}

async function getUserByParams(params: Prisma.UserWhereInput) {
	try {
		console.log(params)
		const user = await prisma.user.findMany({
			where: params,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				role: true,
				childs: {
					select: {
						id: true,
					}
				}
			}
		})
		if (user !== null) {
			return user
		} else {
			return null
		}
	} catch (error) {
		return "Erro ao buscar usuário"
	}
}

export const userController = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	getUserByParams
}