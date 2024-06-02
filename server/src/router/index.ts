import express from 'express'
import userRouter from './user.router'
import mapRouter from './map.router'
import schoolRouter from './school.router'
import childRouter from './child.router'

const routes = (app: express.Express) => {
	app.route('/').get((req, res) => {
		res.send('Hello World')
	})

	app.use(
		express.json(),
		userRouter,
		mapRouter,
		schoolRouter,
		childRouter
	)
}

export default routes