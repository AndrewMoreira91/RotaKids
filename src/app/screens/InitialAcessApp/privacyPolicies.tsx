import { useState } from "react";
import { StatusBar, Text, View, } from "react-native"; 7

import { FontAwesome6 } from "@expo/vector-icons"
import { Checkbox } from "expo-checkbox"

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/reactNavigationTypes";

import { colors } from "@/styles/colors";
import { useUserStore } from "@/store/user-store";

import Button from "@/components/button";

type Props = NativeStackScreenProps<RootStackParamList, "PrivacyPolicy">;

function PrivacyPolicies({ navigation, route }: Props) {

	const [checked, setChecked] = useState(false);

	const [isDisabled, setIsDisabled] = useState(true);

	const { signIn } = useUserStore()

	function handleChecked() {
		setChecked(!checked)
		if (checked === false) {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}

	function handleNext() {
		if (checked === true) {
			signIn(route.params.user)
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

export default PrivacyPolicies;