export type RouteProps = {
	id: number;
	name: string;
	travelDuration?: number;
	halts: HaltProps[];
}

export type HaltProps = {
	id: string;
	address: string;
	latitude: number;
	longitude: number;
	order: number;
	routeId: number;
	type: string;
}