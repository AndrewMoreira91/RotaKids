import exp from "constants";
import express from "express";
import { schollController } from "../controllers/school.controller";

const router = express.Router();

router
	.post('/school', (req, res) => {
		try {
			const school = schollController.createScholl(req.body);
			res.status(201).json(school);
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" });
		}
	})

export default router;