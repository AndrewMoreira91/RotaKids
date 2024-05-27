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
	const users = await prisma.user.findMany()
	return users
}

async function getUserById(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})
	if (user !== null) {
		return user
	} else {
		return "Usuario não encontrado"
	}
}

export const userController = {
	createUser,
	getUsers,
	getUserById
}