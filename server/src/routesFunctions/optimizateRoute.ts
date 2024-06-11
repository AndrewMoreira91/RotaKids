import { RouteOptimizationClient, protos } from "@googlemaps/routeoptimization";
const routeoptimizationClient = new RouteOptimizationClient();

import { Prisma } from "@prisma/client";

import { childController } from "../controllers/child.controller";

type ChildResponse = {
	id: string
	latitude: number
	longitude: number
	school: {
		id: string
		latitude: number
		longitude: number
	}
}

type Halt = {
	type: string
	childId: string
	schoolId: string
	latitude: number
	longitude: number
	address: string
}

export async function calculateOptimizedRoute(driverId: string, homeAddress?: protos.google.type.ILatLng) {
	try {
		const shipments = await getShipments(driverId);

		const homeAddress = {
			latitude: -23.411893,
			longitude: -46.506098
		}

		const response = await routeoptimizationClient.optimizeTours({
			"parent": "projects/rota-kids",
			"model": {
				shipments,
				"vehicles": [
					{
						"endLocation": homeAddress,
						"startLocation": homeAddress,
						"costPerKilometer": 10.0,
						"costPerHour": 40.0
					}
				]
			}
		});
		// console.dir(response[0], { depth: null });

		const route = await generateRouteData(response);
		// console.dir(route, { depth: null });

		return route;
	} catch (error) {
		console.error(error);
	}
}

async function generateRouteData(response: [protos.google.maps.routeoptimization.v1.IOptimizeToursResponse, protos.google.maps.routeoptimization.v1.IOptimizeToursRequest | undefined, {} | undefined]) {
	if (response[0].routes && response[0].routes[0].visits && response[0].routes[0].transitions) {
		const selectChildResponse: Prisma.ChildSelect = {
			id: true,
			latitude: true,
			longitude: true,
			address: true,
			school: {
				select: {
					id: true,
					latitude: true,
					longitude: true,
					address: true
				}
			}
		};

		let origionalOrderedRoute = []
		for (let i = 0; i < response[0].routes[0].visits.length; i++) {
			const visit = response[0].routes[0].visits[i];
			if (visit.isPickup && visit.shipmentLabel) {
				const child = await childController.getChildById(visit.shipmentLabel, selectChildResponse);
				if (child) {
					const halt = {
						type: "child",
						childId: visit.shipmentLabel,
						schoolId: child.school.id,
						latitude: child.latitude,
						longitude: child.longitude,
						address: child.address
					};

					origionalOrderedRoute.push(halt);
				}
			} else if (visit.shipmentLabel) {
				const child = await childController.getChildById(visit.shipmentLabel, selectChildResponse);
				if (child) {
					const halt = {
						type: "school",
						childId: visit.shipmentLabel,
						schoolId: child?.school.id,
						latitude: child?.school.latitude,
						longitude: child?.school.longitude,
						address: child.school.address
					};

					origionalOrderedRoute.push(halt);
				}
			}
		}

		const routeOrdered = removeDuplicateSchools(origionalOrderedRoute);

		const transitionResponse = response[0].routes[0].transitions;

		const route = {
			routeOrder: routeOrdered,
			transition: transitionResponse.map(transition => {
				return {
					travelDuration: transition.travelDuration?.seconds,
					travelDistanceMeters: transition.travelDistanceMeters,
					totalDuration: transition.totalDuration?.seconds,
					startTime: transition.startTime?.seconds,
				};
			})
		};
		return route;
	}
}

async function getShipments(driverId: string) {
	try {
		const childs = await childController.getChildsByParams({ driverId }, {
			id: true,
			school: {
				select: {
					id: true,
					latitude: true,
					longitude: true
				}
			},
			latitude: true,
			longitude: true
		}) as ChildResponse[];

		if (childs.length > 0) {
			const shipments = childs.map(child => {
				const schoolLocation = {
					latitude: child.school.latitude,
					longitude: child.school.longitude
				}
				return {
					label: child.id,
					deliveries: [
						{
							arrivalLocation: schoolLocation,
						}
					],
					pickups: [
						{
							arrivalLocation: {
								latitude: child.latitude,
								longitude: child.longitude
							},
						}
					]
				}
			})
			return shipments;
		}
	} catch (error) {
		console.error(error);
	}
}


function removeDuplicateSchools(origionalOrderedRoute: Halt[]) {
	let previosSchoolId = "";
	const routeOrdered = origionalOrderedRoute.filter(halt => {
		if (halt.type === "school") {
			if (halt.schoolId !== previosSchoolId) {
				previosSchoolId = halt.schoolId;
				return halt;
			}
		} else {
			return halt;
		}
	});
	return routeOrdered;
}
