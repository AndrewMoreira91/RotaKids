import { useState } from "react";
import { StatusBar, View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import { formatCPF, formatPhone } from "@/utils/formatToTexts";

import MainConteiner from "@/components/mainConteiner";
import { Input } from "@/components/input";
import Button from "@/components/button";
import Header from "@/components/header";
import { isCPFValidFormat, isEmailValid, isTelValidFormat } from "@/utils/validations";
import { GuardianProps, UserProps } from "@/types/userType";
import api from "@/lib/axios";
import { StackNavigationState } from "@react-navigation/native";
import { useUserStore } from "@/store/user-store";

type Props = NativeStackScreenProps<HomeStackParamList, "GuardiansRegister">;

export function GuardianRegisterScreen({ navigation }: Props) {
	const [cpf, setCpf] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");

	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { user } = useUserStore()

	function handleSetFilds(value: string, field: string) {
		// console.log("Field: ", field, "Value: ", value)
		if (field === "firstName") {
			setFirstName(value.trim())
		}
		if (field === "lastName") {
			setLastName(value.trim())
		}
		if (field === "cpf") {
			setCpf(value)
		}
		if (field === "email") {
			setEmail(value.trim())
		}
		if (field === "phone") {
			setPhone(value)
		}
		// console.log(firstName !== "", lastName !== "", isCPFValidFormat(cpf), isTelValidFormat(phone), isEmailValid(email))
		if (firstName && lastName && isEmailValid(email) && isCPFValidFormat(cpf) && isTelValidFormat(phone)) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	async function handleSave() {
		if (firstName && lastName && isEmailValid(email) && isCPFValidFormat(cpf) && isTelValidFormat(phone)) {
			setIsLoading(true)
			const data = {
				firstName,
				lastName,
				cpf,
				email,
				phone,
				driverId: user?.id
			} as GuardianProps

			await api.post("/guardians", data)
				.then(response => {
					const guardian: GuardianProps = response.data
					const { routes }: StackNavigationState<HomeStackParamList> = navigation.getState()
					if (routes[routes.length - 2].name === "GuardiansRegister") {
						navigation.navigate("Guardians", { guardian })
					}
					navigation.goBack()
				})
				.catch(error => {
					console.log(error)
				})
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<>
			<Header title="Cadastrar responsável" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<ScrollView>
						<View className="gap-5">
							<View>
								<Text className="text-xl font-semibold">Primeiro nome do responsável</Text>
								<Input>
									<Input.Field
										placeholder="Digite aqui o nome do responsável"
										value={firstName}
										onChangeText={value => handleSetFilds(value, "firstName")}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold"> Sobrenome do responsável</Text>
								<Input>
									<Input.Field
										placeholder="Digite aqui o sobrenome do responsável"
										value={lastName}
										onChangeText={value => handleSetFilds(value, "lastName")}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">CPF do responsável</Text>
								<Input>
									<Input.Field
										placeholder="000.000.000-00"
										onChangeText={value => handleSetFilds(formatCPF(value), "cpf")}
										value={cpf}
										keyboardType="number-pad"
										maxLength={14}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Telefone do responsável</Text>
								<Input>
									<Input.Field
										placeholder="(00) 90000-0000"
										keyboardType="number-pad"
										value={phone}
										onChangeText={value => handleSetFilds(formatPhone(value), "phone")}
										maxLength={13}
									/>
								</Input>
							</View>

							<View>
								<Text className="text-xl font-semibold">Email do responsável</Text>
								<Input>
									<Input.Field
										placeholder="Digite aqui o email"
										keyboardType="email-address"
										value={email}
										onChangeText={value => handleSetFilds(value, "email")}
									/>
								</Input>
							</View>

							<Button isDisabled={isDisabled} onPress={() => handleSave()} isLoading={isLoading}>
								<Button.Text title="Salvar" />
							</Button>
						</View>
					</ScrollView>

				</View>
			</MainConteiner >
		</>
	)
}