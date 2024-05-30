import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";
import Button from "@/components/button";

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
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />
			<View className="gap-4">

				<ButtonPill
					theme="secondary"
					arrowIcon="left"
					iconPosition="left"
					title="Voltar"
					onPress={() => navigation.goBack()}
				/>

				<Button onPress={() => navigation.navigate("RegisterChild")}>
					<Button.Text title="Adicionar uma criança" />
				</Button>

				<FlatList
					data={childs}
					renderItem={({item}) => <Text>{item.name}</Text>}
				/>

			</View>
		</MainConteiner>
	)
}