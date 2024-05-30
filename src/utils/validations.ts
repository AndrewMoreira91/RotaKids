import { Alert } from "react-native";

export function isCPFValidFormat(cpf: string) {
  const regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
  return regex.test(cpf);
}

export function isTelValidFormat(tel: string) {
	const regex = /^(\d{2} \d{5}-\d{4})$/;
	return regex.test(tel);
}

export function isEmailValid(email: string) {
	const re = /\S+@\S+\.\S+/;
	if (!re.test(email)) {
		return false
	}
	return true
}

export function isNameValid(name: string) {
	const re = /^[a-zA-Z]+$/;
	if (!re.test(name)) {
		Alert.alert("O campo não pode conter números ou caracteres especiais")
		return false
	}
	if (name.length < 3) {
		Alert.alert("O campo deve conter no mínimo 3 caracteres")
		return false
	}
	return true
}