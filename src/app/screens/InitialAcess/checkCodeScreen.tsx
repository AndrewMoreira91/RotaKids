import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { startOtpListener, removeListener } from "react-native-otp-verify"
import { Alert, StatusBar, Text, View } from "react-native";

import { AuthStackParamList } from "@/types/reactNavigationTypes";

import formatTel from "@/utils/formatTel";

import ButtonPill from "@/components/buttonPill";
import { Input } from "@/components/input";
import MainConteiner from "@/components/mainConteiner";

export type Props = NativeStackScreenProps<AuthStackParamList, "CheckCode">;

export default function CheckCodeScreen({ navigation, route }: Props) {

	const [code, setCode] = useState<string>("")

	const [isDisabled, setIsDisabled] = useState(false)

	const [phone] = useState(route.params.user.phone)

	// function getOtpCode(message: string) {
	// 	if (message) {
	// 		const otpCode = /(\d{4})/g.exec(message)![1]
	// 		setCode(otpCode)
	// 	}
	// 	if (code) {
	// 		setIsDisabled(false)
	// 	} else {
	// 		setIsDisabled(true)
	// 	}
	// }

	// useEffect(() => {
	// 	startOtpListener(message => getOtpCode(message))

	// 	return () => removeListener()
	// }, [])

	function handleNext() {
		// if (!code) {
		// 	Alert.alert("Codigo", "Por favor, insira um código válido.")
		// }

		navigation.navigate("Register", {
			user: {
				cpf: route.params.user.cpf,
				phone: route.params.user.phone
			}
		})
	}

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />

			<MainConteiner.middle>
				<View className="gap-4">
					<Text className="font-semibold text-2xl">
						Coloque o codigo com 4 digitos enviados para {formatTel(phone ? phone.toString() : "")}
					</Text>

					<View className="flex-row gap-4 w-full">
						<Input variant="square">
							<Input.Field
								variant="square"
								maxLength={1}
								keyboardType="number-pad"
								value={code[0]}
							/>
						</Input>
						<Input variant="square">
							<Input.Field
								variant="square"
								maxLength={1}
								keyboardType="number-pad"
								value={code[1]}
							/>
						</Input>
						<Input variant="square">
							<Input.Field
								variant="square"
								maxLength={1}
								keyboardType="number-pad"
								value={code[2]}
							/>
						</Input>
						<Input variant="square">
							<Input.Field
								variant="square"
								maxLength={1}
								keyboardType="number-pad"
								value={code[3]}
							/>
						</Input>
					</View>

					<ButtonPill
						variant="small"
						theme="secondary"
						title="Eu não recebi o codigo"
					/>
					<ButtonPill
						variant="small"
						theme="secondary"
						title="Login com uma senha"
					/>

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