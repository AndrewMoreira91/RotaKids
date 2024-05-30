export function formatTel(value: string) {
	value = value.replace(/\D/g, "")
	value = value.replace(/^(\d{2})(\d)/, '$1 $2');
	value = value.replace(/^(\d{2}) (\d{5})(\d)/, '$1 $2-$3');
	return value
}

export function formatCPF(value: string) {
	if (value === null || value === undefined || value === "") {
		return ""
	}	
	value = value.replace(/\D/g, "")
	value = value.replace(/^(\d{3})(\d)/, '$1.$2');
	value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
	value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
	return value
}

export function formatDate(currentDate: Date) {
	const months = [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	];
	const date = new Date(currentDate);
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	return `${day} de ${months[monthIndex]} de ${year}`;
}