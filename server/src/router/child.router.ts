import express from "express";
import { childController } from "../controllers/child.controller";

const router = express.Router();

router
	.post('/childs', async (req, res) => {
		try {
			const child = await childController.createChild(req.body)
			res.status(201).json(child)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/childs', async (req, res) => {
		try {
			const childs = await childController.getChilds()
			res.status(200).json(childs)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router;