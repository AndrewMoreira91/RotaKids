import { useState } from "react";
import { router } from "expo-router";
import { Alert, StatusBar, Text, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/reactNavigationTypes";

import formatTel from "@/utils/formatTel";

import { Input } from "@/components/input";
import ButtonPill from "@/components/buttonPill";

export type Props = NativeStackScreenProps<RootStackParamList, "TelRegister">;

export default function TelRegister({ navigation }: Props ) {
	const [tel, setTel] = useState<number | null>(null)

	const [isDisabled, setIsDisabled] = useState(false)

	function handleTelChange(value: string) {
		value = value.replace(/\D/g, "")
		setTel(Number(value))

		if (value.length > 0) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	async function handleNext() {
		if (!tel) {
			Alert.alert("Telefone", "Por favor, insira um número de telefone válido.")
		}
		
		navigation.navigate("CheckCode", { tel })
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
						value={formatTel(tel ? tel.toString() : "")}
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
						onPress={() => navigation.popToTop()}
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