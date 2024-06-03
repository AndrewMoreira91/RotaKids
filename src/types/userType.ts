export type UserProps = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	cpf: string;
}

export type DriverProps = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	cpf: string;
	guardians?: string[];
}

export type GuardianProps = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
	cpf: string;
	driverId: string;
	childs: string[];
}

export type ChildProps = {
	id: string;
	name: string;
	birthDate: Date;
	address: string;
	latitude: number;
	longitude: number;
	guardianId: string;
	schoolId: string;
	driverId: string;
}

export type SchoolProps = {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	driverId: string;
	childs?: string[];
}