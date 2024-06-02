import express from "express";
import { schollController } from "../controllers/school.controller";

const router = express.Router();

router
	.post('/schools', async (req, res) => {
		try {
			const school = await schollController.createScholl(req.body);
			res.status(201).json(school);
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" });
		}
	})
	.get('/schools', async (req, res) => {
		try {
			const schools = await schollController.getScholls();
			res.status(200).json(schools);
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" });
		}
	})

export default router;