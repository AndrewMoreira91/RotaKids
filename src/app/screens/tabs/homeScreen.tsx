import { useEffect, useState } from "react"
import { FontAwesome } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView, StatusBar, Text, View } from "react-native"
import { router } from "expo-router"

import { colors } from "@/styles/colors"
import { HomeStackParamList } from "@/types/reactNavigationTypes"
import { useUserStore } from "@/store/user-store"
import api from "@/lib/axios"

import Button from "@/components/button"
import RoutesBox from "@/components/routesBox"
import ButtonPill from "@/components/buttonPill"
import ListItem from "@/components/listItem"
import Divisor from "@/components/divisor"
import MainConteiner from "@/components/mainConteiner"
import Loading from "@/components/loading"
import { RouteProps } from "@/types/routeType"
import { useRoutesStore } from "@/store/routes-strore"

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
	const { user, signOut } = useUserStore()

	// const [routes, setRoutes] = useState<RouteProps[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const { routes, setRoutes } = useRoutesStore()

	if (!user) {
		signOut()
		router.push("../routes/auth.stack")
		return null
	}

	async function loadRoutes() {
		try {
			await api.get(`/routes/${user?.id}`)
				.then(response => {
					setRoutes(response.data)
				})
				.catch(error => {
					console.log(error)
				})
				.finally(() => {
					setIsLoading(false)
				})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		loadRoutes()
	}, [])

	return (
		<MainConteiner style={{ paddingHorizontal: 0, marginTop: 0 }}>
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

						{isLoading && routes === undefined ? <Loading /> :
							routes.length === 0 ?
								<Text className="text-ink-light text-lg">
									Você não tem rotas cadastradas
								</Text> :
								routes.map((route, i) => (
									i < 2 &&
									<RoutesBox
										key={route.id}
										titleRoute={route.name}
										stops={route.halts.length}
										startTime="06:35"
									/>
								))
						}
						<View className="my-2" />
						<ButtonPill
							title="Gerenciar rotas"
							onPress={() => navigation.navigate("ManageRoutes", { routes })}
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
						<Divisor />
						<ListItem
							icon={require("@/assets/icons/icon-school.png")}
							title="Escolas"
							description="Gerencia as escolas"
							onPress={() => navigation.navigate("Schools")}
						/>
					</View>

				</View>
			</ScrollView>
		</MainConteiner>
	)
}