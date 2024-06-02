export type UserProps = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	cpf: string;
	role: "driver" | "guardian";
}

export type GuardianProps = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: string;
	cpf: string;
	childs: string[];
}

export type SchoolProps = {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}