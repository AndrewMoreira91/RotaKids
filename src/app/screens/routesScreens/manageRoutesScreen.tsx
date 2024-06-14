import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, FlatList, StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";
import ListItemInfo from "@/components/listItemInfo";
import { ScrollView } from "react-native-gesture-handler";
import Divisor from "@/components/divisor";
import { SchoolProps } from "@/types/userType";
import api from "@/lib/axios";
import Loading from "@/components/loading";
import { useUserStore } from "@/store/user-store";
import { RouteProps } from "@/types/routeType";
import ButtonPill from "@/components/buttonPill";
import { useRoutesStore } from "@/store/routes-strore";

type Props = NativeStackScreenProps<HomeStackParamList, "ManageRoutes">;

export function ManageRoutesScreen({ navigation, route }: Props) {

	const [isLoading, setIsLoading] = useState(false);

	const { routes, setRoutes } = useRoutesStore()

	useEffect(() => {
		setRoutes(route.params.routes)
	}, [])

	const { user } = useUserStore()

	function handleGenerateRoute() {
		setIsLoading(true)
		api.post(`/routes/optimize/`, { driverId: user?.id, nameRoute: "Rota 1" })
			.then(response => {
				console.log("Response: ", response.data)
				if (response.data === "No childs found") {
					return Alert.alert("Erro", "Precisa ter cadastrado pelo menos uma criança para gerar uma rota automaticamente")
				}
				setRoutes(response.data)
				navigation.navigate("DetailsRoute", { route: response.data[0] })
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<Header title="Rotas" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4 mb-20">

					{routes && routes.length === 0 && (
						<>
							<Text className="font-bold text-2xl">
								Você não tem nenhuma rota cadastrada
							</Text>
							<Text className="text-gray-800 text-base">
								Você pode gerar uma rota automaticamente com base nas crianças cadastradas, ou adicionar uma rota manualmente.
							</Text>

							<Button onPress={handleGenerateRoute} isLoading={isLoading}>
								<Button.Text title="Gerar rota automaticamente" />
							</Button>
						</>
					)}

					<ButtonPill title="Adicionar rota manualmente" theme="secondary" />
					{routes && routes.length > 0 && (
						<FlatList
							data={routes}
							renderItem={({ item }) => (
								<ListItemInfo
									title={item.name}
									onPress={() => navigation.navigate("DetailsRoute", { route: item })}
								/>
							)}
							keyExtractor={(item) => item.id.toString()}
						/>
					)}

				</View>
			</MainConteiner>
		</>
	)
}