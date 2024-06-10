import express from 'express'
import { AddressProps, mapController } from '../controllers/map.controller';

const router = express.Router()

router
	.post('/maps/address', async (req, res) => {
		try {
			console.log(req.body)
			const { address }: AddressProps = req.body
			const result = await mapController.addressValidation({ address })
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.post('/maps/route', async (req, res) => {
		try {
			const { driverId } = req.body
			const result = await mapController.getRouteOptimized(driverId)
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router 