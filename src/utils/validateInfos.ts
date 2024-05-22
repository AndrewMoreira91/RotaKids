import { Alert } from "react-native";

export function validateNames(name: string) {
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

export function validateEmail(email: string) {
	const re = /\S+@\S+\.\S+/;
	if (!re.test(email)) {
		return false
	}
	return true
}