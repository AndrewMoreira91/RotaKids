import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";
import api from "@/lib/axios";

import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";
import { ChildProps } from "@/types/userType";
import { ScrollView } from "react-native-gesture-handler";
import { formatDate } from "@/utils/formatToTexts";
import ListItemInfo from "@/components/listItemInfo";
import Divisor from "@/components/divisor";
import Loading from "@/components/loading";
import { useUserStore } from "@/store/user-store";

type Props = NativeStackScreenProps<HomeStackParamList, "Childs">;

export function ChildsScreen({ navigation }: Props) {

	const [isLoading, setIsLoading] = useState(true);
	const [childsList, setChildsList] = useState<ChildProps[]>([])

	const { user } = useUserStore()

	async function loadChilds() {
		try {
			await api.get(`/childs/search?driverId=${user?.id}`)
				.then(response => {
					setChildsList(response.data)
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
		loadChilds()
	}, [])
	return (
		<>
			<Header title="Crianças" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<Button onPress={() => navigation.navigate("ChildRegister")}>
						<Button.Text title="Adicionar uma criança" />
					</Button>

					{isLoading && <View className="h-full justify-center items-center"><Loading /></View>}
					<ScrollView>
						{childsList.map((child, index) => {
							return (
								<View key={index}>
									<ListItemInfo
										title={child.name}
										secondTitle={formatDate(child.birthDate)}
										onPress={() => navigation.navigate("DetailsChild", { child })}
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