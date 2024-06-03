import express from "express";
import { schollController } from "../controllers/school.controller";
import { Prisma } from "@prisma/client";

const router = express.Router();

type QueryParams = {
	id?: string;
	name?: string;
	address?: string;
	latitude?: number;
	longitude?: number;
	driverId?: string;
}

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
	.get('/schools/search', async (req, res) => {
		try {
			let query = {} as Prisma.SchoolWhereUniqueInput;
			const { driverId, address, name } = req.query as QueryParams

			if (name) query.name = name
			if (address) query.address = address
			if (driverId) query.driverId = driverId

			const guardian = await schollController.getSchollByParams(query)
			res.status(200).json(guardian)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" });
		}
	})

export default router;