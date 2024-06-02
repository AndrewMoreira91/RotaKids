import express from 'express';
import { driverController } from '../controllers/driver.controller';
import { Prisma } from '@prisma/client';

const router = express.Router();

export type QueryParams = {
	cpf?: string,
	email?: string,
	firstName?: string,
	lastName?: string,
	phone?: string
}

router
	.post('/drivers', async (req, res) => {
		try {
			const driver = await driverController.createDriver(req.body)
			res.status(201).json(driver)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/drivers', async (req, res) => {
		try {
			const drives = await driverController.getDrives()
			res.status(200).json(drives)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/drivers/search', async (req, res) => {
		try {
			let query = {} as Prisma.DriverWhereUniqueInput
			const { cpf, email, firstName, phone, lastName } = req.query as QueryParams
			if (cpf) query.cpf = cpf
			if (email) query.email = email
			if (firstName) query.firstName = firstName
			if (phone) query.phone = phone
			if (lastName) query.lastName = lastName

			const drives = await driverController.getDriverByParams(query)
			res.status(200).json(drives)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/drivers/:id', async (req, res) => {
		try {
			const { id } = req.params
			const driver = await driverController.getDriverById(id)
			res.status(200).json(driver)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router;