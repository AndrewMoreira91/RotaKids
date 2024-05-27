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

app.get('/users/search', async (req, res) => {
	try {
		const { email } = req.query as { email: string }
		const users = await userController.getUserByParams({ email })
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

export default app