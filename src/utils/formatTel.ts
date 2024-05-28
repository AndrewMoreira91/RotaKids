export function formatTel(value: string) {
	value = value.replace(/\D/g, "")
	value = value.replace(/^(\d{2})(\d)/, '$1 $2');
	value = value.replace(/^(\d{2}) (\d{5})(\d)/, '$1 $2-$3');
	return value
}

export function isTelValidFormat(tel: string) {
	const regex = /^(\d{2} \d{5}-\d{4})$/;
	return regex.test(tel);
}