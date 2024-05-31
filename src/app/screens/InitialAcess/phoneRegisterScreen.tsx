import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, StatusBar, Text, View } from "react-native";

import { AuthStackParamList } from "@/types/reactNavigationTypes";
import { isTelValidFormat } from "@/utils/validations";
import { formatPhone } from "@/utils/formatToTexts";

import { Input } from "@/components/input";
import ButtonPill from "@/components/buttonPill";
import MainConteiner from "@/components/mainConteiner";

export type Props = NativeStackScreenProps<AuthStackParamList, "PhoneRegister">;

export default function PhoneRegisterScreen({ navigation, route }: Props) {
	const [phone, setPhone] = useState<string | null>(null)

	const [isDisabled, setIsDisabled] = useState(true)

	function handleTelChange(value: string) {
		// value = value.replace(/\D/g, "")
		setPhone(value)

		if (value.length === 13) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	async function handleNext() {
		if (phone === null || !isTelValidFormat(phone)) {
			Alert.alert("Telefone", "Por favor, insira um número de telefone válido.")
		} else {
			navigation.navigate("CheckCode", {
				user: {
					cpf: route.params.user.cpf,
					phone
				}
			})
		}
	}

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />

			<MainConteiner.middle>
				<View className="gap-3">
					<Text className="font-semibold text-3xl">
						Digite seu telefone
					</Text>

					<Input>
						<Text className="text-ink-normal">
							55+
						</Text>
						<Input.Field
							placeholder="(00) 00000-0000"
							keyboardType="number-pad"
							onChangeText={value => handleTelChange(value)}
							maxLength={13}
							value={formatPhone(phone ? phone : "")}
						/>
					</Input>
				</View>

				<View className="gap-6">
					<Text className="text-ink-light font-regular">
						Ao continuar você receberá um SMS para verificação. Podem ser aplicadas taxas de dados e mensagens.
					</Text>

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
				</View>
			</MainConteiner.middle>
		</MainConteiner>
	)
}