import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, StatusBar, Text, View } from "react-native";

import { isEmailValid, isNameValid } from "@/utils/validateInfos";
import { AuthStackParamList } from "@/types/reactNavigationTypes";

import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";
import MainConteiner from "@/components/mainConteiner";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation, route }: Props) {

	const [isDisabled, setIsDisabled] = useState(true)

	const [email, setEmail] = useState<string>("")
	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")

	function handleSetFilds(value: string, field: string) {
		if (field === "email") {
			setEmail(value.trim())
		}
		if (field === "firstName") {
			setFirstName(value.trim())
		}
		if (field === "lastName") {
			setLastName(value.trim())
		}

		if (firstName && lastName && isEmailValid(email)) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	function handleNext() {
		if (!isEmailValid(email)) {
			return Alert.alert("E-mail inválido")
		}
		if (!isNameValid(firstName)) {
			return Alert.alert("Nome inválido")
		}
		if (!isNameValid(lastName)) {
			return Alert.alert("Sobrenome inválido")
		}

		navigation.navigate("PrivacyPolicy", {
			user: {
				cpf: route.params.user.cpf,
				phone: route.params.user.phone,
				firstName,
				lastName,
				email
			}
		})
	}

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />

			<MainConteiner.middle>
				<View className="gap-10">
					<View className="gap-4">
						<Text className="font-semibold text-3xl text-ink-normal">
							Qual é o seu nome completo?
						</Text>
						<Input variant="outline">
							<Input.Field
								placeholder="Primeiro nome"
								onChangeText={value => handleSetFilds(value, "firstName")}
								value={firstName}
								onBlur={() => { isNameValid(firstName) }}
							/>
						</Input>
						<Input variant="outline">
							<Input.Field
								placeholder="Sobrenome"
								onChangeText={value => handleSetFilds(value, "lastName")}
								value={lastName}
								onBlur={() => { isNameValid(lastName) }}
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
								onBlur={() => { isEmailValid(email) }}
							/>
						</Input>
					</View>

				</View>

				<View className="w-full flex-row justify-between">
					<ButtonPill
						theme="secondary"
						arrowIcon="left"
						onPress={() => navigation.goBack()}
					/>
					<ButtonPill
						title="Next"
						arrowIcon="right"
						isDisabled={isDisabled}
						onPress={handleNext}
					/>
				</View>
			</MainConteiner.middle>

		</MainConteiner>
	)
}