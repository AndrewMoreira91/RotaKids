import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";
import Button from "@/components/button";
import Header from "@/components/header";

type Props = NativeStackScreenProps<HomeStackParamList, "Childs">;

export function ChildsScreen({ navigation }: Props) {

	const childs = [
		{
			name: "Lorena"
		},
		{
			name: "Enzo"
		}
	]

	return (
		<>
			<Header title="Crianças" navigation={navigation} />
			<MainConteiner style={{marginTop: 0}}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<Button onPress={() => navigation.navigate("ChildRegister")}>
						<Button.Text title="Adicionar uma criança" />
					</Button>

					<FlatList
						data={childs}
						renderItem={({ item }) => <Text>{item.name}</Text>}
					/>

				</View>
			</MainConteiner>
		</>
	)
}