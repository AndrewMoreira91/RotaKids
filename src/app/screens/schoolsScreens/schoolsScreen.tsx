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

type Props = NativeStackScreenProps<HomeStackParamList, "Schools">;

export function SchoolsScreen({ navigation }: Props) {

	const [isLoading, setIsLoading] = useState(true);

	const [schoolList, setSchoolList] = useState<SchoolProps[]>([])

	const { user } = useUserStore()

	async function loadSchool() {
		try {
			await api.get(`/schools/search?driverId=${user?.id}`)
				.then(response => {
					if (response.data.length > 0) {
						setSchoolList(response.data)
					}
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
		loadSchool()
	}, [])

	return (
		<>
			<Header title="Escolas" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4 mb-20">

					<Button onPress={() => navigation.navigate("SchoolsRegister")}>
						<Button.Text title="Adicionar uma nova escola" />
					</Button>

					{isLoading && <View className="h-full justify-center items-center"><Loading /></View>}
					<ScrollView>
						{schoolList.map((school, index) => {
							return (
								<View key={index}>
									<ListItemInfo
										title={school.name}
										secondTitle={school.address}
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