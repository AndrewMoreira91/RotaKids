import express from 'express'
import { userController } from './controllers/user.controller';
import { Prisma } from '@prisma/client';
import addressValidation, { AddressProps } from './controllers/map.contreller';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.post('/users', async (req, res) => {
	try {
		const user = await userController.createUser(req.body)
		res.status(201).json(user)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})


app.get('/users', async (req, res) => {
	try {
		const users = await userController.getUsers()
		res.status(200).json(users)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})

export type QueryParams = {
	cpf?: string,
	email?: string,
	firstName?: string,
	phone?: string
}

app.get('/users/search', async (req, res) => {
	try {
		let query = {} as Prisma.UserWhereUniqueInput
		const { cpf, email, firstName, phone } = req.query as QueryParams

		if (cpf) query.cpf = cpf
		if (email) query.email = email
		if (firstName) query.firstName = firstName
		if (phone) query.phone = phone

		console.log(query)

		const users = await userController.getUserByParams(query)
		res.status(200).json(users)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})

app.get('/users/:id', async (req, res) => {
	try {
		const { id } = req.params
		const user = await userController.getUserById(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})

app.post('/maps/address', async (req, res) => {
	try {
		console.log(req.body)
		const { address }: AddressProps = req.body
		const result = await addressValidation({ address })
		res.status(200).json(result)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
});

export default app