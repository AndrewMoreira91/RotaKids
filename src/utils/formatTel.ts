export default function formatTel(value: string) {
	value = value.replace(/^(\d{2})(\d)/, '$1 $2');
	value = value.replace(/^(\d{2}) (\d{5})(\d)/, '$1 $2-$3');
	return value
}