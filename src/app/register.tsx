import { useState } from "react";
import { router } from "expo-router";

import { Alert, StatusBar, Text, View } from "react-native";

import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";

export default function CheckTel() {

	const [isDisabled, setIsDisabled] = useState(false)

	const [email, setEmail] = useState<string>("")
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")

	function validateNames(name: string) {
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

	function validateEmail(email: string) {
		const re = /\S+@\S+\.\S+/;
		if (!re.test(email)) {
			return false
		}
		return true
	}

	function handleSetFilds(value: string, field: string) {
		if (field === "email") {
			setEmail(value)
		}
		if (field === "firstName") {
			setFirstName(value)
		}
		if (field === "lastName") {
			setLastName(value)
		}

		if (firstName && lastName && validateEmail(email)) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	function handleNext() {
		// if (!validateEmail(email)) {
		// 	return Alert.alert("E-mail inválido")
		// }
		// if (!validateNames(firstName)) {
		// 	return Alert.alert("Nome inválido")
		// }
		// if (!validateNames(lastName)) {
		// 	return Alert.alert("Sobrenome inválido")
		// }

		router.push("/privacyPolicies")
	}

	return (
		<View className="flex-1 bg-gray-25 px-4 justify-between my-6">
			<StatusBar barStyle={"dark-content"} />

			<View className="mt-6 gap-10">

				<View className="gap-4">
					<Text className="font-semibold text-3xl text-ink-normal">
						Qual é o seu nome completo?
					</Text>
					<Input variant="outline">
						<Input.Field
							placeholder="Primeiro nome"
							onChangeText={value => handleSetFilds(value, "firstName")}
							value={firstName}
							onBlur={() => { validateNames(firstName)}}
						/>
					</Input>
					<Input variant="outline">
						<Input.Field
							placeholder="Sobrenome"
							onChangeText={value => handleSetFilds(value, "lastName")}
							value={lastName}
							onBlur={() => { validateNames(lastName)}}
						/>
					</Input>
				</View>

				<View>
					<Text className="font-semibold text-3xl">
						Qual é o seu e-mail?
					</Text>
					<Input variant="outline">
						<Input.Field
							placeholder="Digite seu e-mail"
							keyboardType="email-address"
							onChangeText={value => handleSetFilds(value, "email")}
							value={email}
							onBlur={() => { validateEmail(email)}}
						/>
					</Input>
				</View>

			</View>

			<View className="w-full flex-row justify-between">
				<ButtonPill
					theme="secondary"
					arrowIcon="left"
					onPress={() => router.back()}
				/>
				<ButtonPill
					title="Next"
					arrowIcon="right"
					isDisabled={isDisabled}
					onPress={handleNext}
				/>
			</View>
		</View>
	)
}