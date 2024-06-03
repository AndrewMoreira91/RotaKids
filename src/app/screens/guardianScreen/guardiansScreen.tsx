import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StatusBar, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import api from "@/lib/axios";

import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";
import Loading from "@/components/loading";
import { GuardianProps } from "@/types/userType";
import Divisor from "@/components/divisor";
import ListItemInfo from "@/components/listItemInfo";
import { StackNavigationState } from "@react-navigation/native";
import { useUserStore } from "@/store/user-store";

type Props = NativeStackScreenProps<HomeStackParamList, "Guardians">;

export function GuardiansScreen({ navigation, route }: Props) {
	const [isLoading, setIsLoading] = useState(true);

	const [guardiansList, setGuardiansList] = useState<GuardianProps[]>([])

	const { user } = useUserStore()

	async function loadGuardians() {
		try {
			await api.get(`/guardians/search?driverId=${user?.id}`)
				.then(response => {
					setGuardiansList(response.data)
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
		loadGuardians()
	}, [])

	const { routes }: StackNavigationState<HomeStackParamList> = navigation.getState()
	if (routes[routes.length - 2].name === "GuardiansRegister") {
		if (route.params?.guardian) {
			const guardian = route.params.guardian
			setGuardiansList([...guardiansList, guardian])
		}
	}

	return (
		<>
			<Header title="Responsáveis" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4 mb-20">

					<Button onPress={() => navigation.navigate("GuardiansRegister")}>
						<Button.Text title="Adicionar um novo responsável" />
					</Button>

					{isLoading && <View className="h-full justify-center items-center"><Loading /></View>}
					<ScrollView>
						{guardiansList.map((guardian, index) => {
							return (
								<View key={index}>
									<ListItemInfo
										title={`${guardian.firstName} ${guardian.lastName}`}
										secondTitle={`${guardian.childs === undefined ? "0" : guardian.childs.length} criança(s)`}
									/>
									<Divisor />
								</View>
							)
						})}
					</ScrollView>

				</View>
			</MainConteiner>
		</>
	)
}