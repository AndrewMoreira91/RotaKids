import { useUserStore } from "@/store/user-store"
import { ScrollView, StatusBar, Text, View } from "react-native"

import Button from "@/components/button"
import MainConteiner from "@/components/mainConteiner"
import { FontAwesome } from "@expo/vector-icons"

export default function SettingsScreen() {

	const { signOut, user } = useUserStore()

	if(!user) return null

	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />

			<MainConteiner.middle>

				<ScrollView>
					<View className="gap-4">
						<Text className="text-4xl font-bold mb-6">
							{user.firstName + ' ' + user.lastName}
						</Text>
						
						<View className="flex-row justify-between items-center">
							<FontAwesome name="user-circle" size={24}/>
							<Text className="font-semibold text-lg">Informações da conta</Text>
							<FontAwesome name="chevron-right"/>
						</View>
						<View className="flex-row justify-between items-center">
							<FontAwesome name="car" size={24}/>
							<Text className="font-semibold text-lg">Veiculo</Text>
							<FontAwesome name="chevron-right"/>
						</View>
						<View className="flex-row justify-between items-center">
							<FontAwesome name="gavel" size={24}/>
							<Text className="font-semibold text-lg">Configuração do App</Text>
							<FontAwesome name="chevron-right"/>
						</View>

						<Button theme="secondary" onPress={() => signOut()}>
							<Button.Text theme="secondary" title="SignOut" />
						</Button>
					</View>
				</ScrollView>
			</MainConteiner.middle>
		</MainConteiner>
	)
}