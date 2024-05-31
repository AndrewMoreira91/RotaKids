import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";

type Props = NativeStackScreenProps<HomeStackParamList, "Schools">;

export function SchoolsScreen({ navigation }: Props) {

	const guardians = [
		{ name: "Escola 1" },
		{ name: "Escola 2" },
		{ name: "Escola 3" }
	]

	return (
		<>
			<Header title="Escolas" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<Button onPress={() => navigation.navigate("SchoolsRegister")}>
						<Button.Text title="Adicionar uma nova escola" />
					</Button>

					<FlatList
						data={guardians}
						renderItem={({ item }) => <Text>{item.name}</Text>}
					/>

				</View>
			</MainConteiner>
		</>
	)
}