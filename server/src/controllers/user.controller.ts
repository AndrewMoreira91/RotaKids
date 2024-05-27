import { UUID } from "crypto"
import prisma from "../lib/prima"
import { UserProps } from "../types/user.type"

async function createUser(data: UserProps) {
	const user = await prisma.user.create({
		data
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
			cpf: false,
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
				password: false,
				cpf: false,
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
				password: false,
				cpf: false,
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

async function getUserByParams(params: { email: string }) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: params.email,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				phone: true,
				password: false,
				cpf: false,
			}
		})
		if (user !== null) {
			return user
		} else {
			return "Usuario não encontrado"
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