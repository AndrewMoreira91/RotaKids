import { Prisma } from "@prisma/client";
import prisma from "../lib/prima";
import { ChildData, calculateOptimizedRoute } from "../routesFunctions/optimizateRoute";
import { HaltProps, RouteProps } from "../types/routes.types";

async function getRoutes(driverId: string) {
	try {
		const route = await prisma.route.findMany({
			where: {
				driverRoutes: {
					some: {
						driverId
					}
				}
			},
			select: {
				id: true,
				name: true,
				halts: {
					orderBy: {
						order: "asc"
					},
				}
			}
		});
		return route;
	} catch (error) {
		console.error(error);
	}
}

async function createRouteOptimized(driverId: string, nameRoute: string, childs?: ChildData[]) {
	try {
		if (childs === undefined) {
			childs = await prisma.child.findMany({
				where: {
					driverId
				},
				select: {
					id: true,
					latitude: true,
					longitude: true,
					school: {
						select: {
							id: true,
							latitude: true,
							longitude: true
						}
					}
				}
			})
		}

		console.log("childs: ", childs);

		const optimizedRoute = await calculateOptimizedRoute(childs);

		console.log("optimizedRoute: ", optimizedRoute);

		const newRoute = await createRoute({
			name: nameRoute,
		});

		if (newRoute && optimizedRoute) {
			optimizedRoute.routeOrder.forEach(async (halt, i) => {
				await createHaltRoute({
					routeId: newRoute.id,
					latitude: halt.latitude,
					longitude: halt.longitude,
					order: i + 1,
					address: halt.address,
					type: halt.type,
					name: halt.name
				} as HaltProps);
			});

			const createdDriverRoute = await createDriverRoute(driverId, newRoute.id);

			if (createdDriverRoute) {
				const route = [{
					name: newRoute.name,
					id: newRoute.id,
					halts: optimizedRoute.routeOrder
				}]
				console.log("Route retornada: ", route);
				return route;
			}

		} else {
			return "Error creating route"
		}
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function createHaltRoute(data: HaltProps) {
	try {
		const haltRoute = await prisma.halt.create({
			data
		})
		return haltRoute;
	} catch (error) {
		console.error(error);
	}
}

async function DeleteRoute(routeId: number) {
	try {

		await prisma.halt.deleteMany({
			where: {
				routeId
			}
		})

		await prisma.driverRoute.deleteMany({
			where: {
				routeId
			}
		})

		const deletedRoute = await prisma.route.delete({
			where: {
				id: routeId
			}
		})
		return { deletedRouteId: deletedRoute.id };
	} catch (error) {
		console.error(error);
	}
}

async function createRoute(data: RouteProps) {
	try {
		const route = await prisma.route.create({
			data,
		})
		return route;
	} catch (error) {
		console.error(error);
	}
}

async function createDriverRoute(driverId: string, routeId: number) {
	try {
		const driverRoute = await prisma.driverRoute.create({
			data: {
				driverId,
				routeId
			}
		})
		return driverRoute;
	} catch (error) {
		console.error(error);
	}
}

export const routeController = {
	createRoute,
	createHaltRoute,
	createDriverRoute,
	createRouteOptimized,
	getRoutes,
	DeleteRoute
}