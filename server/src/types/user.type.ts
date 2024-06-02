export type DriverProps = {
	firstName: string,
	lastName: string,
	phone: string,
	cpf: string,
	email: string,
	password?: string
}

export type GuardianProps = {
	firstName: string,
	lastName: string,
	phone: string,
	cpf: string,
	email: string,
	password?: string
	driverId: string
}