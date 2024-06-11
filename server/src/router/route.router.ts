import express from 'express';
import { routeController } from '../controllers/route.controller';
import { RouteProps } from '../types/routes.types';

const router = express.Router();

router
	.post('/routes/optimize', async (req, res) => {
		try {
			const { nameRoute, driverId } = req.body
			const result = await routeController.createRouteOptimized(driverId, nameRoute)
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/routes/:driverId', async (req, res) => {
		try {
			const { driverId } = req.params
			const result = await routeController.getRoutes(driverId)
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.delete('/routes/:routeId', async (req, res) => {
		try {
			const { routeId } = req.params
			const result = await routeController.DeleteRoute(parseInt(routeId))
			res.status(200).json(result)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router