import express from 'express';
import { userController } from '../controllers/user.controller';
import { Prisma } from '@prisma/client';

const router = express.Router();

export type QueryParams = {
	cpf?: string,
	email?: string,
	firstName?: string,
	phone?: string
	role?: "guardian" | "driver"
}

router
	.post('/users', async (req, res) => {
		try {
			const user = await userController.createUser(req.body)
			res.status(201).json(user)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/users', async (req, res) => {
		try {
			const users = await userController.getUsers()
			res.status(200).json(users)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/users/search', async (req, res) => {
		try {
			let query = {} as Prisma.UserWhereUniqueInput
			const { cpf, email, firstName, phone, role } = req.query as QueryParams
			if (cpf) query.cpf = cpf
			if (email) query.email = email
			if (firstName) query.firstName = firstName
			if (phone) query.phone = phone
			if (role) query.role = role

			const users = await userController.getUserByParams(query)
			res.status(200).json(users)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

	.get('/users/:id', async (req, res) => {
		try {
			const { id } = req.params
			const user = await userController.getUserById(id)
			res.status(200).json(user)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router;