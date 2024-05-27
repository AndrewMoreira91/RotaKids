import express from 'express'
import { userController } from './controllers/user.controller';
import { UserProps } from './types/user.type';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.post('/users', async (req, res) => {
	try {
		const { name, email, password }: UserProps = req.body
		const user = await userController.createUser({ name, email, password })
		res.status(201).json(user)
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

app.get('/users', async (req, res) => {
	try {
		const users = await userController.getUsers()
		res.status(200).json(users)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})

export default app