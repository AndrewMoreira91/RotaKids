import prisma from "../lib/prima";
import { calculateOptimizedRoute } from "../routesFunctions/optimizateRoute";
import { HaltProps, RouteProps } from "../types/routes.types";

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

async function createRouteOptimized(driverId: string, nameRoute: string) {
	try {
		if (driverId === undefined) throw new Error("DriverId is required");
		
		const routerOptimized = await calculateOptimizedRoute(driverId);

		const route = await createRoute({ name: nameRoute });

		if (route && routerOptimized) {
			routerOptimized.routeOrder.forEach(async (halt, i) => {
				await createHaltRoute({
					routeId: route.id,
					latitude: halt.latitude,
					longitude: halt.longitude,
					order: i + 1,
					address: halt.address
				} as HaltProps);
			});

			const driverRoute = await createDriverRoute(driverId, route.id);

			if (driverRoute) {
				return { routeId: route.id, driverRouteId: driverRoute.id }
			}
		}

		return routerOptimized;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export const routeController = {
	createRoute,
	createHaltRoute,
	createDriverRoute,
	createRouteOptimized
}