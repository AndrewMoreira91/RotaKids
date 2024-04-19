import { useState } from "react";
import { Alert, StatusBar, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/reactNavigationTypes";

import formatTel from "@/utils/formatTel";

import { Input } from "@/components/input";
import ButtonPill from "@/components/buttonPill";

export type Props = NativeStackScreenProps<RootStackParamList, "PhoneRegister">;

export default function PhoneRegister({ navigation, route }: Props ) {
	const [phone, setPhone] = useState<number>(0)

	const [isDisabled, setIsDisabled] = useState(true)

	function handleTelChange(value: string) {
		value = value.replace(/\D/g, "")
		setPhone(Number(value))

		if (value.length === 11) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	async function handleNext() {
		if (!phone) {
			Alert.alert("Telefone", "Por favor, insira um número de telefone válido.")
		}
		
		navigation.navigate("CheckCode", { user: {
			cpf: route.params.user.cpf,
			phone: phone ? phone : 0,
		} } )
	}

	return (
		<View className="flex-1 bg-gray-25 px-4 justify-between my-6">
			<StatusBar barStyle={"dark-content"} />

			<View className="mt-10 gap-3">
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
						value={formatTel(phone ? phone.toString() : "")}
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
		</View>
	)
}