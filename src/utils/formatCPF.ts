export default function formatCPF(value: string) {
	if (value === null || value === undefined || value === "") {
		return ""
	}	
	value = value.replace(/\D/g, "")
	value = value.replace(/^(\d{3})(\d)/, '$1.$2');
	value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
	value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
	return value
}