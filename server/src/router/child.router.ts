import express from "express";
import { childController } from "../controllers/child.controller";

const router = express.Router();

router
	.post('/child', async (req, res) => {
	try {
		const child = await childController.createChild(req.body)
		res.status(201).json(child)
	} catch (error) {
		res.status(400).json({error, message: "Erro interno do servidor"})
	}
})

export default router;