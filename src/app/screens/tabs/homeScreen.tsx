import { useUserStore } from "@/store/user-store"
import { router } from "expo-router"
import { ScrollView, StatusBar, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesome } from "@expo/vector-icons"

import { colors } from "@/styles/colors"

import Button from "@/components/button"
import RoutesBox from "@/components/routesBox"
import ButtonPill from "@/components/buttonPill"
import ListItem from "@/components/listItem"
import Divisor from "@/components/divisor"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "@/types/reactNavigationTypes"

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
	const { user, signOut } = useUserStore()

	if (!user) {
		signOut()
		router.push("../routes/auth.stack")
		return null
	}

	const insets = useSafeAreaInsets()

	return (
		<View style={{
			flex: 1,
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			backgroundColor: colors.gray[75]
		}}>
			<StatusBar barStyle={"dark-content"} />

			<View className="w-full py-2 px-4 bg-blue-900 flex-row gap-3 items-center">
				<FontAwesome name="user-circle-o" color={colors.gray[300]} size={50} />
				<View>
					<Text className="font-regular text-lg text-gray-75">Olá,</Text>
					<Text
						className="font-bold text-gray-25 text-4xl leading-8"
					>{user.firstName}</Text>
				</View>
			</View>
			<View className="bg-blue-950 px-4 py-1">
				<Text className="text-lg text-gray-25">Sexta-feira 19 de abril</Text>
			</View>

			<ScrollView>
				<View className="p-4 gap-3">
					<View className="flex-row items-center gap-1 overflow-hidden">
						<FontAwesome name="clock-o" color={"#222222"} size={30} />
						<Text className="text-lg flex-wrap">
							Sua próxima rota irá começar daqui á: 19 minutos
						</Text>
					</View>

					<Button>
						<Button.Text title="Comecar rota agora" />
					</Button>

					<View className="bg-gray-200 rounded-2xl px-3 py-2">
						<Text className="text-2xl font-bold text-ink-normal">
							Suas rotas de hoje
						</Text>

						<RoutesBox
							titleRoute="Rota Manhã"
							schools={3}
							stops={14}
							startTime="06:35"
						/>
						<RoutesBox
							titleRoute="Rota Tarde"
							schools={2}
							startTime="13:00"
							stops={8}
						/>
						<View className="my-2" />
						<ButtonPill
							title="Gerenciar rotas"
							onPress={() => navigation.navigate("ManageRoutes")}
						/>
					</View>

					<Text className="font-bold text-ink-normal text-2xl">
						Gerencie suas informações
					</Text>

					<View>
						<ListItem
							icon={require("@/assets/icons/icon-students.png")}
							title="Crianças"
							description="Gerencia as crianças que você transporta"
							onPress={() => navigation.navigate("Childs")}
						/>
						<Divisor />
						<ListItem
							icon={require("@/assets/icons/icon-coin.png")}
							title="Pagamentos"
							description="Gerencia os pagamentos das mensalidades"
							onPress={() => navigation.navigate("Payments")}
						/>
						<Divisor />
						<ListItem
							icon={require("@/assets/icons/icon-guardian.png")}
							title="Responsáveis"
							description="Gerencia os renponsãveis pelas as crianças que você transporta"
							onPress={() => navigation.navigate("Guardians")}
						/>
					</View>

				</View>
			</ScrollView>
		</View>
	)
}