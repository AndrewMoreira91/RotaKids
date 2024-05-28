import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, Text, View } from "react-native";

import { HomeStackParamList } from "@/types/reactNavigationTypes";

import MainConteiner from "@/components/mainConteiner";
import ButtonPill from "@/components/buttonPill";

type Props = NativeStackScreenProps<HomeStackParamList, "Childs">;

export function ChildsScreen({ navigation }: Props) {
	return (
		<MainConteiner>
			<StatusBar barStyle={"dark-content"} />
			<MainConteiner.middle>
				<Text className="text-5xl">
					ChildsScreen
				</Text>

				<View className="w-full flex-row justify-between">
					<ButtonPill
						theme="secondary"
						arrowIcon="left"
						onPress={() => navigation.goBack()}
					/>
					<ButtonPill
						title="Next"
						arrowIcon="right"
					/>
				</View>
			</MainConteiner.middle>
		</MainConteiner>
	)
}