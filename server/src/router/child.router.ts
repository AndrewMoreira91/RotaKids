import express from "express";
import { childController } from "../controllers/child.controller";
import { Prisma } from "@prisma/client";

const router = express.Router();

type QueryParams = {
	name?: string
	address?: string
	driverId?: string
	guardianId?: string
}

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
	.get('/childs/search', async (req, res) => {
		try {
			let query = {} as Prisma.ChildWhereUniqueInput
			const { name, address, guardianId, driverId } = req.query as QueryParams
			if (name) query.name = name
			if (address) query.address = address
			if (guardianId) query.guardianId = guardianId
			if (driverId) query.driverId = driverId

			const childs = await childController.getChildsByParams(req.query)
			res.status(200).json(childs)
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})
	.get('/childs/:id', async (req, res) => {
		try {
			const child = await childController.getChildById(req.params.id)
			if (child) {
				res.status(200).json(child)
			} else {
				res.status(404).json({ message: "Criança não encontrada" })
			}
		} catch (error) {
			res.status(400).json({ error, message: "Erro interno do servidor" })
		}
	})

export default router;