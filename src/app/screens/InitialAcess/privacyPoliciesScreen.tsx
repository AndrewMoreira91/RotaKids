import { useState } from "react";
import { StatusBar, Text, View, } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons"
import { Checkbox } from "expo-checkbox"

import { AuthStackParamList } from "@/types/reactNavigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "@/styles/colors";
import { useUserStore } from "@/store/user-store";

import Button from "@/components/button";
import api from "@/lib/axios";

type Props = NativeStackScreenProps<AuthStackParamList, "PrivacyPolicy">;

export default function PrivacyPoliciesScreen({ navigation, route }: Props) {

	const [checked, setChecked] = useState(false);

	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const { signIn } = useUserStore()

	function handleChecked() {
		setChecked(!checked)
		if (checked === false) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	async function handleNext() {
		if (checked === true) {
			setIsLoading(true)
			const response = await api.post("/drivers", route.params.user)
				.finally(() => setIsLoading(false))
			if (response.data) {
				signIn(response.data)
			}
		}
	}

	return (
		<View className="flex-1 bg-gray-25 px-4 items-center justify-around my-6">
			<StatusBar barStyle={"dark-content"} />

			<View className="items-center gap-2">
				<View className="w-44 h-44 items-center justify-center bg-gray-200 rounded-full">
					<FontAwesome6 name="user" size={100} color={colors.blue[900]} />
				</View>

				<Text className="font-semibold text-2xl text-ink-normal">
					Ao tocar no botão abaixo, você concorda com os Termos de Uso da RotaLKids e reconhece que leu a Política de Privacidade
				</Text>
			</View>

			<View className="gap-5 mx-4">
				<Text className="text-xl font-regular ">
					Marque a caixa para indicar que você tem pelo menos 18 anos de idade, concorda com os Termos e Condições e reconhece a Política de Privacidade.
				</Text>

				<View className="flex-row items-center gap-2">
					<Checkbox value={checked} onValueChange={handleChecked} />
					<Text
						className="text-lg font-regular text-gray-700 leading-none"
						onPress={handleChecked}
					>
						Aceito os termos e condições e reconheço a política de privacidade
					</Text>
				</View>
			</View>

			<Button isDisabled={isDisabled} onPress={handleNext}>
				<Button.Text title="Proximo" />
			</Button>

		</View>
	)
}