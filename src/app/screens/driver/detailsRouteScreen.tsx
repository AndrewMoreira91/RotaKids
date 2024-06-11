import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StatusBar, Text, View } from "react-native";

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

type Props = NativeStackScreenProps<HomeStackParamList, "DetailsRoute">;

export function DetailsRouteScreen({ navigation, route }: Props) {

	const [isLoading, setIsLoading] = useState(true);
	const [routeDetail, setRouteDetail] = useState<RouteProps | null>(null);

	const { removeRoute } = useRoutesStore()

	const { user } = useUserStore()

	async function handleDeleteRoute() {
		try {
			setIsLoading(true)
			await api.delete(`/routes/${routeDetail?.id}`)
				.then(response => {
					removeRoute(response.data.deletedRouteId)
					navigation.goBack()
				}).catch(error => {
					console.log(error)
				}).finally(() => {
					setIsLoading(false)
				})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setRouteDetail(route.params.route)
		setIsLoading(false)
	}, [])

	if (isLoading === true || routeDetail === null || routeDetail === undefined) {
		return <Loading />
	} else {
		return (
			<>
				<Header title={routeDetail.name} navigation={navigation} />
				<MainConteiner style={{ marginTop: 0 }}>
					<StatusBar barStyle={"dark-content"} />
					<ScrollView>
						<View className="gap-4 mb-20">
							<View className="gap-4">
								<Text className="font-semibold text-2xl">Paradas</Text>
								{routeDetail.halts.map(halt => (
									<View className="gap-4" key={halt.id}>
										<View className="flex-row haitems-center justify-between">
											<View className="flex-auto">
												<Text className="font-semibold text-xl">{halt.name}</Text>
												<Text className="font-regular text-lg">{halt.address}</Text>
											</View>
										</View>
										<Divisor />
									</View>
								))}
							</View>
							<Button onPress={handleDeleteRoute} isLoading={isLoading}>
								<Button.Text title="Deletar rota" />
							</Button>
						</View>
					</ScrollView>
				</MainConteiner>
			</>
		)
	}
}