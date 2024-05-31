import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import Button from "@/components/button";
import Header from "@/components/header";

type Props = NativeStackScreenProps<HomeStackParamList, "Guardians">;

export function GuardiansScreen({ navigation }: Props) {

	const guardians = [
		{
			name: "João"
		},
		{
			name: "Maria"
		}
	]

	return (
		<>
			<Header title="Responsáveis" navigation={navigation} />
			<MainConteiner style={{ marginTop: 0 }}>
				<StatusBar barStyle={"dark-content"} />
				<View className="gap-4">

					<Button onPress={() => navigation.navigate("GuardiansRegister")}>
						<Button.Text title="Adicionar um novo responsável" />
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