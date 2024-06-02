import express from 'express'
import addressValidation, { AddressProps } from '../controllers/map.contreller';

const router = express.Router()

router
	.post('/maps/address', async (req, res) => {
		try {
			console.log(req.body)
			const { address }: AddressProps = req.body
			const result = await addressValidation({ address })
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	});

export default router 