import express from 'express';
import { guardianController } from '../controllers/guardian.controller';
import { Prisma } from '@prisma/client';

const router = express.Router();

export type QueryParams = {
	cpf?: string,
	email?: string,
	firstName?: string,
	lastName?: string,
	phone?: string
	driverId?: string
}

router
	.post('/guardians', async (req, res) => {
		try {
			const guardian = await guardianController.createGuardian(req.body)
			res.status(201).json(guardian)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/guardians', async (req, res) => {
		try {
			const guardians = await guardianController.getGuardians()
			res.status(200).json(guardians)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/guardians/search', async (req, res) => {
		try {
			let query = {} as Prisma.GuardianWhereUniqueInput
			const { cpf, email, firstName, phone, lastName, driverId } = req.query as QueryParams
			if (cpf) query.cpf = cpf
			if (email) query.email = email
			if (firstName) query.firstName = firstName
			if (phone) query.phone = phone
			if (lastName) query.lastName = lastName
			if (driverId) query.driverId = driverId

			const guardian = await guardianController.getGuardianByParams(query)
			res.status(200).json(guardian)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/guardians/:id', async (req, res) => {
		try {
			const { id } = req.params
			const guardian = await guardianController.getGuardianById(id)
			res.status(200).json(guardian)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router;