import { colors } from "@/styles/colors";
import { FontAwesome6 } from "@expo/vector-icons"
import { StatusBar, Text, View } from "react-native";

function PrivacyPolicies() {
	return (
		<View className="flex-1 bg-gray-25 px-4 items-center justify-around my-6">
			<StatusBar barStyle={"dark-content"} />

			<View className="flex-row items-center">
				<View className="self-start w-44 h-44 items-center justify-center bg-gray-400 rounded-full">
					<FontAwesome6 name="user" size={100} color={colors.blue[900]} />
				</View>
			</View>

			<Text className="font-semibold text-xl text-ink-normal">
				Ao tocar no botão abaixo, você concorda com os Termos de Uso da RotaLKids e reconhece que leu a Política de Privacidade
			</Text>

			<Text className="text-base font-regular ">
				Marque a caixa para indicar que você tem pelo menos 18 anos de idade, concorda com os Termos e Condições e reconhece a Política de Privacidade.
			</Text>

		</View>
	)
}

export default PrivacyPolicies;